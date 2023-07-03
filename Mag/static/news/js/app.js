"use strict";
import { toggleDropDown } from "./toggleDropDown.js";
import { getData } from "./getData.js";
import { generateNews } from "./generateNews.js";
import { createOverlayCard } from "./createOverlayCard.js";
import { pagination } from "./pagination.js";
import { contants } from "./constants.js";
import { calendar } from "./calendar.js";
import { utils } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    await calendar;

    const { createPagination, windowScrollTo } = await pagination;
    const { openActiveIdOverlayCard } = createOverlayCard;
    const { calculatePaginationNumber, sortForDate } = utils;
    const { pageObject, ACTIVE_PAGE_NUMBER, NUMBER_OF_NEWS_ON_PAGE } = contants;
    const data = sortForDate((await getData("/news/data")).data);
    const pageNumber = calculatePaginationNumber(data, NUMBER_OF_NEWS_ON_PAGE);

    let { rightLimitPage } = pageObject;

    history.pushState(null, null, `?page=${ACTIVE_PAGE_NUMBER}`);
    toggleDropDown();
    generateNews(data, NUMBER_OF_NEWS_ON_PAGE);
    openActiveIdOverlayCard();
    createPagination(1, rightLimitPage, pageNumber);
    windowScrollTo(ACTIVE_PAGE_NUMBER);
});