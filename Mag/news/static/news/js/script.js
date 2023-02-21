"use strict";
import { toggleDropDown } from "./toggleDropDown.js";
import { getData } from "./getData.js";
import { utils } from "./utils.js";
import { generateNews } from "./generateNews.js";
import { contants } from "./constants.js";
import { createOverlayCard } from "./createOverlayCard.js";

document.addEventListener("DOMContentLoaded", async () => {
    const { determineActivePage } = utils;
    const { openActiveIdOverlayCard } = createOverlayCard;
    const {
        NUMBER_OF_NEWS_ON_PAGE,
        ACTIVE_PAGE_NUMBER,
        OFFSET,
        pageObject
    } = contants;

    const data = (await getData("/news/data")).data.reverse();
    const paginationList = document.querySelector(".article_pagination-list");
    const sectionGrid = document.querySelector(".section_grid");
    const pageNumber = Math.ceil(data.length / NUMBER_OF_NEWS_ON_PAGE);

    function addActivePaginationClass(element) {
        if (+element.textContent) {
            element.classList.add("article_pagination-list-item_active");
        }
    }

    function removeActivePaginationClass() {
        const pages = Array.from(paginationList.children);
        pages.forEach((page) => {
            page.classList.remove("article_pagination-list-item_active");
            page.classList.add("article_pagination-list-item");
        });
        return pages;
    }

    function clickScrollToSection(e) {
        e.preventDefault();
        pageObject.activeClickSection = +e.target.textContent;
        if (pageObject.activeClickSection > pageObject.maxActiveSection) {
            removeListCardNews();
            generateNews(
                data,
                pageObject.activeClickSection * NUMBER_OF_NEWS_ON_PAGE
            );
        }
        addActivePaginationClass(e.target.parentElement);
        removeActivePaginationClass();
        window.scrollTo({
            top: (pageObject.activeClickSection - 1) * OFFSET,
            left: 0,
            behavior: "smooth",
        });
    }

    async function createPagination(rangeNumber) {
        let shift;
        let next = +determineActivePage() + 5;
        let btnToStart = 0;
        if (+determineActivePage() - rangeNumber < rangeNumber) {
            shift = 1;
            pageObject.limit = 5;
        } else {
            shift = +determineActivePage() - rangeNumber;
            pageObject.limit = +determineActivePage() + rangeNumber;
        }
        for (let i = shift; i <= pageNumber; i++) {
            const pageBtn = document.createElement("li");
            const pageBtnLink = document.createElement("a");
            pageBtn.addEventListener("click", clickScrollToSection);
            pageBtnLink.href = `?page=${i}`;
            if (shift > 1 && btnToStart == 0) {
                pageBtnLink.style.width = `100%`;
                pageBtnLink.style.padding = `18px 18px 0px 18px`;
                pageBtnLink.textContent = "В начало";
                pageBtnLink.href = `?page=1`;
                pageBtn.append(pageBtnLink);
                paginationList.prepend(pageBtn);
                btnToStart = 1;
                i--;
                continue;
            }
            if (i == ACTIVE_PAGE_NUMBER) {
                pageBtn.classList.add("article_pagination-list-item_active");
            } else {
                pageBtn.classList.add("article_pagination-list-item");
            }
            if (i > pageObject.limit) {
                pageBtnLink.style.width = `100%`;
                pageBtnLink.style.padding = `18px 18px 0px 18px`;
                pageBtnLink.textContent = "Дальше";
                if (next > pageNumber) {
                    pageBtnLink.href = `?page=${pageNumber}`;
                } else {
                    pageBtnLink.href = `?page=${next}`;
                }
                pageBtn.append(pageBtnLink);
                paginationList.append(pageBtn);
                break;
            } else {
                pageBtnLink.textContent = i;
            }
            pageBtn.append(pageBtnLink);
            paginationList.append(pageBtn);
        }
    }

    function newsLoadingWhileScrolling(plus) {
        let countNews = NUMBER_OF_NEWS_ON_PAGE + plus;
        window.scrollTo({
            top: (pageObject.activeScrollSection - 1) * OFFSET,
            left: 0,
            behavior: "smooth",
        });
        window.addEventListener("scroll", () => {
            pageObject.activeScrollSection =
                Math.floor(window.scrollY / OFFSET) + 1;
            if (
                pageObject.lastActiveSection != pageObject.activeScrollSection
            ) {
                pageObject.lastActiveSection = pageObject.activeScrollSection;
                pageObject.maxActiveSection = Math.max(
                    pageObject.activeScrollSection,
                    pageObject.maxActiveSection
                );
                if (pageObject.activeScrollSection > pageObject.limit) {
                    paginationList.textContent = "";
                    createPagination(2);
                    history.pushState(
                        null,
                        null,
                        `?page=${pageObject.activeScrollSection}`
                    );
                    addActivePaginationClass(
                        removeActivePaginationClass()[
                            pageObject.activeScrollSection - 1
                        ]
                    );
                }
                history.pushState(
                    null,
                    null,
                    `?page=${pageObject.activeScrollSection}`
                );
                addActivePaginationClass(
                    removeActivePaginationClass()[
                        pageObject.activeScrollSection - 1
                    ]
                );
            }
            if (
                window.innerHeight + window.pageYOffset >=
                document.body.offsetHeight
            ) {
                removeListCardNews();
                generateNews(data,countNews);
                countNews += plus;
            }
        });
    }

    function removeListCardNews() {
        sectionGrid.textContent = "";
    }
    
    history.pushState(null, null, `?page=${ACTIVE_PAGE_NUMBER}`);
    toggleDropDown();
    generateNews(data, NUMBER_OF_NEWS_ON_PAGE);
    createPagination(2);
    openActiveIdOverlayCard();
    newsLoadingWhileScrolling(6);
});
