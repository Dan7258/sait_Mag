import { getData } from "./getData.js";
import { utils } from "./utils.js";
import { generateNews } from "./generateNews.js";
import { contants } from "./constants.js";

export const pagination = (async () => {
    
    const {
        NUMBER_OF_NEWS_ON_PAGE,
        ACTIVE_ID_NUMBER,
        OFFSET,
        pageObject,
        slidingPagination,
        timingSlidingPagination
    } = contants;
    const { filterPagesForText, calculatePaginationNumber, sortForDate } = utils;
    
    const data = sortForDate((await getData("/news/data")).data.reverse());
    const paginationList = document.querySelector(".article_pagination-list");
    const sectionGrid = document.querySelector(".section_grid");
    const pageNumber = calculatePaginationNumber(data, NUMBER_OF_NEWS_ON_PAGE);

    let {
        lastActiveSection: last,
        maxActiveSection: max,
        activeScrollSection: active,
        rightLimitPage,
        leftLimitPage,
        rangeLimit,
        scroll,
        plus,
        filteredData,
    } = pageObject;
    let scrollingFunction = newsLoadingWhileScrolling(plus);

    const windowScrollTo = (activeNumber = +active) => {
        window.scrollTo({
            top: (activeNumber - 1) * OFFSET,
            left: 0,
            behavior: "smooth",
        });
    };

    const addExtraCardNews = (numberOfNews, fullData = data) => {
        removeListCardNews();
        generateNews(fullData, numberOfNews);
    };

    const removeListCardNews = () => {
        sectionGrid.textContent = "";
    };

    const removePagination = () => {
        paginationList.textContent = "";
    }

    const changeActivePageBtn = () => {
        if (ACTIVE_ID_NUMBER != "") {
            history.pushState(
                null,
                null,
                `/page/${active}/id/${ACTIVE_ID_NUMBER}`
            );
        } else {
            history.pushState(null, null, `/page/${active}`);
        }
        addActivePaginationClass(
            removeActivePaginationClass()[createVirtualActive() - 1]
        );
    };

    const limitLeftSide = (fullData = data) => {
        if (active == leftLimitPage) {
            removePagination();
            rightLimitPage = leftLimitPage + 1;
            leftLimitPage = leftLimitPage - rangeLimit;
            createPagination(leftLimitPage + 1, rightLimitPage, calculatePaginationNumber(fullData, NUMBER_OF_NEWS_ON_PAGE));
        }
    };

    const limitRightSide = (fullData = data) => {
        if (active == rightLimitPage) {
            removePagination();
            createPagination(rightLimitPage, rightLimitPage + rangeLimit, calculatePaginationNumber(fullData, NUMBER_OF_NEWS_ON_PAGE));
            leftLimitPage = rightLimitPage - 1;
            rightLimitPage += rangeLimit;
        }
    };

    const limitAllSides = (fullData = data) => {
        limitRightSide(fullData);
        limitLeftSide(fullData);
    };

    const determineActiveSection = (fullData = data) => {
        active = Math.floor(window.scrollY / OFFSET) + 1;
        if (last != active) {
            limitAllSides(fullData);
            last = active;
            max = Math.max(active, max);
            changeActivePageBtn();
        }
    };

    function newsLoadingWhileScrolling(plus, fullData = data) {
        let countNews = NUMBER_OF_NEWS_ON_PAGE + plus;
        const scrollingFunction = () => {
            const pageHeight = document.body.offsetHeight;
            const fullTopOffset = window.innerHeight + window.pageYOffset;
            if (fullTopOffset >= pageHeight && active != pageNumber) {
                addExtraCardNews(countNews, fullData);
                countNews += plus;
            }
            determineActiveSection(fullData);
        }
        return scrollingFunction;
    };

    const animatePagination = () => {
        if (window.scrollY > 0 && !scroll) {
            scroll = true;
            paginationList.animate(slidingPagination, timingSlidingPagination);
            setTimeout(() => {
                window.removeEventListener("scroll", animatePagination);
            }, timingSlidingPagination.duration);
        }
    };

    const createBtnText = (text, btnLink) => {
        btnLink.style.width = `100%`;
        btnLink.style.padding = `18px 18px 0px 18px`;
        btnLink.textContent = text;
        return btnLink;
    };
    
    const createPagination = (startNumber = 1, cycleLimit = pageNumber, numberOfAllNews = pageNumber) => {
        if (filteredData.length > 0) {
            max = 0; // баг с этим связан
        }
        let diff = cycleLimit - numberOfAllNews;
        if (diff > 0) {
            cycleLimit -= diff - 1;
        }
        for (let i = startNumber; i < cycleLimit; i++) {
            const pageBtn = createPageBtn();
            let pageBtnLink = createPageBtnLink(i);
            activatePageBtn(pageBtn, i);
            pageBtn.append(pageBtnLink);
            paginationList.append(pageBtn);
        }
        if (startNumber > 1) {
            const toStartBtn = createPageBtn();
            toStartBtn.append(createBtnText("В начало", createPageBtnLink(1)));
            const toPrevBtn = createPageBtn();
            toPrevBtn.append(
                createBtnText("Назад", createPageBtnLink(startNumber - 1))
            );
            paginationList.prepend(toStartBtn, toPrevBtn);
        }
        if (diff <= 0) {
            const toNextBtn = createPageBtn();
            toNextBtn.append(
                createBtnText(
                    "Дальше",
                    createPageBtnLink(generateNextPageNumber(cycleLimit))
                )
            );
            paginationList.append(toNextBtn);
        }
    };

    const generateNextPageNumber = (nextNumberPage) => {
        let nextNumber = nextNumberPage;
        if (nextNumber > pageNumber) {
            nextNumber = pageNumber;
        }
        return nextNumber;
    };

    const activatePageBtn = (element, numb) => {
        if (active == numb) {
            element.classList.add("article_pagination-list-item_active");
        }
    };

    const createPageBtnLink = (pageNumber = "") => {
        let pageBtnLink = document.createElement("a");
        pageBtnLink.textContent = pageNumber;
        pageBtnLink.href = `/page/${pageNumber}`;
        return pageBtnLink;
    };

    const createPageBtn = () => {
        const pageBtn = document.createElement("li");
        pageBtn.classList.add("article_pagination-list-item");
        pageBtn.addEventListener("click", clickScrollToSection);
        return pageBtn;
    };

    const clickScrollToSection = (e) => {
        e.preventDefault();
        const pageRegex = /\d+$/;
        active = +e.target.href.match(pageRegex)[0];
        if (active > max) {
            addExtraCardNews(active * NUMBER_OF_NEWS_ON_PAGE);
        }
        removeActivePaginationClass();
        addActivePaginationClass(e.target.parentElement);
        windowScrollTo(active);
    };

    const removeActivePaginationClass = () => {
        let pages = Array.from(paginationList.children);
        if (pages) {
            pages = filterPagesForText(pages);
        }
        pages.forEach(turnOffActivePage);
        return pages;
    };

    const turnOffActivePage = (page) => {
        page.classList.remove("article_pagination-list-item_active");
        page.classList.add("article_pagination-list-item");
    };

    const createVirtualActive = () => {
        return active % rangeLimit == 0 ? rangeLimit : active % rangeLimit;
    };

    const addActivePaginationClass = (element) => {
        if (element) {
            element.classList.add("article_pagination-list-item_active");
        }
    };

    window.addEventListener("scroll", scrollingFunction)
    window.addEventListener("scroll", animatePagination);

    return { createPagination, windowScrollTo, removeListCardNews, removePagination, addExtraCardNews, newsLoadingWhileScrolling, scrollingFunction };
})();
