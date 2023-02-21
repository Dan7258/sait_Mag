import { utils } from "./utils.js";

export const contants = (() => {
    const { determineActiveId, determineActivePage } = utils;
    const NUMBER_OF_NEWS_ON_PAGE = 6;
    const ACTIVE_ID_NUMBER = determineActiveId();
    const ACTIVE_PAGE_NUMBER = determineActivePage();
    const OFFSET = 1060;

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

    const pageObject = {
        activeScrollSection: determineActivePage(),
        activeClickSection: determineActivePage(),
        lastActiveSection: 1,
        maxActiveSection: 1,
        limit: 1,
        previousRange: 1,
    };

    return {
        NUMBER_OF_NEWS_ON_PAGE,
        ACTIVE_ID_NUMBER,
        ACTIVE_PAGE_NUMBER,
        OFFSET,
        newTiming,
        newShow,
        newHide,
        pageObject
    } 
})();