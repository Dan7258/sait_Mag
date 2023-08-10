import { utils } from "./utils.js";

export const contants = (() => {
    
    const { determineActiveId, determineActivePage } = utils;
    const NUMBER_OF_NEWS_ON_PAGE = 6;
    const ACTIVE_ID_NUMBER = +determineActiveId();
    const ACTIVE_PAGE_NUMBER = +determineActivePage();
    const OFFSET = 1060;
    const MEDIA_URL = "http://127.0.0.1:8000";
    
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
    const slidingPagination = [
        {
            transform: "translate(-50%, 0%)"
        },
        {
            transform: "translate(-50%, -155%)"
        }
    ]
    const timingSlidingPagination = {
        duration: 600,
        fill: "forwards"
    }
    // const slidingButton = [
    //     {
    //         transform: "translate(175%,0)"
    //     },
    //     {
    //         transform: "translate(-100%,0)"
    //     }
    // ]
    // const timingButton = {
    //     duration: 600
    // }
    const calendarIcon = [
        {
            transform: "translateX(0px)"
        },
        {
            transform: "translateX(100px)"
        }
    ]
    const calendarIconBack = [
        {
            transform: "translateX(100px)"
        },
        {
            transform: "translateX(0px)"
        }
    ]
    const calendarCross = [
        {
            transform: "translateX(-100px)"
        },
        {
            transform: "translateX(0px)"
        }
    ]
    const calendarCrossBack = [
        {
            transform: "translate(0px,0%)",
        },
        {
            transform: "translate(-100px,0)",
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
        rightLimitPage: 6,
        leftLimitPage: 0,
        rangeLimit: 5,
        maxActiveSection: 1,
        scroll: false,
        plus: 6,
        filteredData: [],
    };

    return {
        NUMBER_OF_NEWS_ON_PAGE,
        ACTIVE_ID_NUMBER,
        ACTIVE_PAGE_NUMBER,
        OFFSET,
        MEDIA_URL,
        newTiming,
        newShow,
        newHide,
        slidingPagination,
        timingSlidingPagination,
        // timingButton,
        // slidingButton,
        calendarIcon,
        calendarCross,
        calendarCrossBack,
        calendarIconBack,
        pageObject,
    } 
})();