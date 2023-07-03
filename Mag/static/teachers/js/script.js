"use strict";
document.addEventListener("DOMContentLoaded", async () => {
    let activePage = determineActivePage();
    let activeId = determineActiveId();
    const ELEMS_ON_PAGE = 8;
    const DATA_URL = "data";
    const ACTIVE_PAGE_URL = `/cathedra/teachers/?page=${activePage}`;
    const data = (await getData(DATA_URL));
    const generalWrap = document
        .querySelector(".people")
        .querySelector(".div_wrap");
    const peopleWrap = document.querySelector(".people_wrap");
    const newShow = [
        {
            opacity: "0",
            transform: "translate(0,5%)",
        },
        {
            opacity: "1",
            transform: "translate(0,0)",
        },
    ];
    const newHide = [
        {
            opacity: "1",
            transform: "translate(0,0%)",
        },
        {
            opacity: "0",
            transform: "translate(0,5%)",
        },
    ];
    const newTiming = {
        duration: 300,
        fill: "forwards",
    };
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        data.data = addId(data.data);
        return data.data;
    }
    function determineActivePage() {
        let activePage = 1;
        if (window.location.href.match(/page=\d+/)) {
            activePage = window.location.href.match(/page=\d+/)[0].slice(5);
        }
        return activePage;
    }
    function determineActiveId() {
        let activeId = "";
        if (window.location.href.match(/id=\d+/)) {
            activeId = window.location.href.match(/id=\d+/)[0].slice(3);
        }
        return activeId;
    }
    function divideData(arr, numberOfElements) {
        return arr.splice((activePage - 1) * numberOfElements,numberOfElements);
    }
    function addId(arr) {
        arr = arr.map((i,index) => {
            i.id = index + 1;
            return i;
        });
        return arr;
    }
    async function createCardList() {
        const data = divideData(await getData(DATA_URL), ELEMS_ON_PAGE);
        data.forEach(i => {
            let card = `<div class="people_card">
                            <div class="people_img">
                                <img src="${i.src}" alt="teacher" />
                            </div>
                            <div class="people_txt">
                                <h2 class="people_header">${i.title}</h2>
                                <p class="people_status">${i.status}</p>
                            </div>
                        </div>`;
            peopleWrap.insertAdjacentHTML("beforeend", card);
        });
        const cards = document.querySelectorAll(".people_card");
        if (activeId != "") {
            insertOverlayCard(cards[(activeId - 1) % ELEMS_ON_PAGE], activeId - 1);
        }
        openCard(cards);
    }
    function createPagination(pageNumber, rangeNumber) {
        const paginationList = document.querySelector(".article_pagination-list");
        let shift;
        let limit;
        let next = +activePage + 5;
        let btnToStart = 0;
        if (+activePage - rangeNumber < rangeNumber) {
            shift = 1;
            limit = 5;
        } else {
            shift = +activePage - rangeNumber;
            limit = +activePage + rangeNumber;
        }
        for(let i = shift; i <= pageNumber; i++) {
            const pageBtn = document.createElement("li");
            const pageBtnLink = document.createElement("a");
            pageBtnLink.href = `?page=${i}`;
            if (i == activePage) {
                pageBtn.classList.add("article_pagination-list-item_active");
            } else {
                pageBtn.classList.add("article_pagination-list-item");
            }
            if (shift > 1 && btnToStart == 0) {
                pageBtnLink.style.width = `100%`;
                pageBtnLink.style.padding = `18px 18px 0px 18px`;
                pageBtnLink.textContent = "В начало";
                pageBtnLink.href = `?page=1`;
                pageBtn.append(pageBtnLink);
                paginationList.prepend(pageBtn);
                console.log(pageBtn);
                btnToStart = 1;
                i--;
                continue;
            }
            if (i > limit) {
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
    function navBarOn() {
        let dropDownbtn = document.querySelector(".dropdown-toggle"),
            menu = document.querySelector(".dropdown-menu");
        function switchSocialColor() {
            let icons = document.querySelectorAll(".social_card");
            icons.forEach((card) => {
                let img = card.firstElementChild.firstElementChild;
                card.addEventListener("mouseover", () => {
                    img.src = "/static/main/img/" + img.alt + "_or.svg";
                });
                card.addEventListener("mouseout", () => {
                    img.src = "/static/main/img/" + img.alt + ".svg";
                });
            });
        }
        function dropDownToggleForward() {
            dropDownbtn.addEventListener("click", () => {
                menu.classList.toggle("active");
            });
        }
        function dropDownToggleHidden() {
            document.addEventListener("click", (e) => {
                if (
                    menu.classList.contains("active") &&
                    e.target != dropDownbtn
                ) {
                    menu.classList.remove("active");
                }
            });
            document.addEventListener("keydown", (e) => {
                if (menu.classList.contains("active") && e.key == "Escape") {
                    menu.classList.remove("active");
                }
            });
        }
        dropDownToggleForward();
        dropDownToggleHidden();
        switchSocialColor();
    }
    navBarOn();
    function createHTMLTag(tag, className = "") {
        const HTMLTag = document.createElement(tag);
        if (className != "") {
            HTMLTag.classList.add(className);
        }
        return HTMLTag;
    }
    function createOverlayCard(card) {
        const peopleOverlay = createHTMLTag("div", "people__overlay");
        const peoplePicture = createHTMLTag("div", "people__picture");
        const peoplePortrait = createHTMLTag("img", "people__portrait");
        const peopleOverlayContent = createHTMLTag(
            "div",
            "people__overlay-content"
        );
        const peopleOverlayTitle = createHTMLTag(
            "div",
            "people__overlay-title"
        );
        const peopleName = createHTMLTag("p", "people__name");
        const peopleSt = createHTMLTag("p", "people__st");
        const peopleDescription = createHTMLTag("p", "people__description");
        const peopleClose = createHTMLTag("div", "people_close");
        const peopleCrossIcon = createHTMLTag("img");
        peoplePortrait.src = card.imgSrc;
        peoplePortrait.alt = "Фотография преподавателя";
        peopleName.textContent = card.name;
        peopleSt.textContent = card.status;
        peopleDescription.textContent = card.descr;
        peopleCrossIcon.src = "/static/teachers/img/Close_round.svg";
        peopleOverlay.append(peoplePicture);
        peoplePicture.append(peoplePortrait);
        peopleOverlay.append(peopleOverlayContent);
        peopleOverlayContent.append(peopleOverlayTitle);
        peopleOverlayTitle.append(peopleName);
        peopleOverlayTitle.append(peopleSt);
        peopleOverlayContent.append(peopleDescription);
        peopleOverlay.append(peopleClose);
        peopleClose.append(peopleCrossIcon);
        return peopleOverlay;
    }
    function insertOverlayCard(cardItem,index) {
        const card = {
            imgSrc: cardItem.querySelector("img").src,
            name: cardItem.querySelector(".people_header").textContent,
            status: cardItem.querySelector(".people_status").textContent,
            descr: data[index].body,
            id: (index + 1) + ((activePage - 1) * ELEMS_ON_PAGE)
        };
        let link = window.location.href.match(/teachers\/.*/)[0].substring(8);
        if (!link.match(/id=\d+/)) {
            history.pushState(card.id, null, `${ACTIVE_PAGE_URL}/?id=${card.id}`);
        }
        const peopleOverlay = createOverlayCard(card);
        peopleOverlay.animate(newShow, newTiming);
        generalWrap.prepend(peopleOverlay);
        peopleOverlay.addEventListener("click", (e) => {
            const crossBtn = peopleOverlay
                .querySelector(".people_close")
                .querySelector("img");
            if (crossBtn == e.target) {
                history.pushState(null, null, ACTIVE_PAGE_URL);
                peopleOverlay.animate(newHide, newTiming);
                setTimeout(() => peopleOverlay.remove(), newTiming.duration);
            }
        });
        window.addEventListener(
            "keydown",
            (e) => {
                if (e.key == "Escape") {
                    history.pushState(null, null, ACTIVE_PAGE_URL);
                    peopleOverlay.animate(newHide, newTiming);
                    setTimeout(
                        () => peopleOverlay.remove(),
                        newTiming.duration
                    );
                }
            },
            { once: true }
        );
    }
    function openCard(cards) {
        cards.forEach((i, index) => {
            i.addEventListener("click", () => insertOverlayCard(i,index));
        });
    }
    createCardList();
    createPagination(Math.ceil(data.length / ELEMS_ON_PAGE), 2);
    history.pushState(null, null, ACTIVE_PAGE_URL);
});
