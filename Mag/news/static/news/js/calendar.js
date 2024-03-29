import { getData } from "./getData.js";
import { generateNews } from "./generateNews.js";
import { contants } from "./constants.js";
import { pagination } from "./pagination.js";
import { utils } from "./utils.js";

export const calendar = (async () => {
    const checkCurrentDate = (obj) => {
        return obj.date == calendar.date.today;
    };

    const cutOffProp = (prop, obj) => {
        let date = workWithDate(
            calendar instanceof VanillaCalendar ? String(obj.date.today) : [obj]
        );
        if (prop == "month") {
            calendarObj.setActiveMonth(getMonthFromDate(date));
        } else {
            calendarObj.setActiveYear(getYearFromDate(date));
        }
    };

    const addProp = (prop, value, obj) => {
        if (checkCurrentDate(obj)) {
            obj.date = {
                [prop]: value,
            };
        } else {
            obj.date = {
                ...obj.date,
                [prop]: value,
            };
        }
    };

    const getActiveElemDate = (prop, obj) => {
        if (checkCurrentDate(obj)) {
            cutOffProp(prop, obj);
            obj.clean();
        } else if (!obj.date.hasOwnProperty(prop)) {
            cutOffProp(prop, calendar);
        }
        return obj.date[prop];
    };

    const {
        NUMBER_OF_NEWS_ON_PAGE,
        pageObject,
        newTiming,
        slidingButton,
        newShow,
        newHide,
        timingSlidingPagination,
        calendarIcon,
        calendarCross,
        calendarCrossBack,
        calendarIconBack,
    } = contants;
    const {
        removeListCardNews,
        createPagination,
        removePagination,
        newsLoadingWhileScrolling,
    } = await pagination;
    const {
        workWithDate,
        calculatePaginationNumber,
        getYearFromDate,
        getMonthFromDate,
        sortForDate,
    } = utils;
    const data = sortForDate((await getData("/news/data")).data);
    const datesArr = Array.from(new Set(data.map((i) => i.date.smallDate)));
    const calendarButton = document.querySelector(".calendar-button");
    const calendarCrossElem = document.querySelector(".calendar__cross");
    const calendarIconElem = document.querySelector(".calendar__icon");

    let { rightLimitPage, plus, filteredData, scroll } = pageObject;
    let { scrollingFunction } = await pagination;

    const isNewExist = (month, year) => {
        let isExist = false;
        datesArr.forEach((item) => {
            let currentMonth = getMonthFromDate(item);
            let currentYear = getYearFromDate(item);
            if (currentMonth == month && currentYear == year) {
                isExist = true;
            }
        });
        return isExist;
    };

    const filterDataForDate = () => {
        if (
            isNewExist(
                calendarObj.getActiveMonth(),
                calendarObj.getActiveYear()
            )
        ) {
            filteredData = data
                .map((item) => {
                    if (
                        calendarObj.getActiveMonth() ==
                            getMonthFromDate(item.date.smallDate) &&
                        calendarObj.getActiveYear() ==
                            getYearFromDate(item.date.smallDate)
                    ) {
                        return item;
                    } else {
                        return 0;
                    }
                })
                .filter((item) => item);
        }
        return filteredData;
    };

    const generateFilteredPage = () => {
        removeListCardNews();
        generateNews(filteredData, NUMBER_OF_NEWS_ON_PAGE);
        removePagination();
        createPagination(
            1,
            rightLimitPage,
            calculatePaginationNumber(filteredData, NUMBER_OF_NEWS_ON_PAGE)
        );
        window.removeEventListener("scroll", scrollingFunction);
        scrollingFunction = newsLoadingWhileScrolling(plus, filteredData);
        window.addEventListener("scroll", scrollingFunction);
    };

    const calendar = new VanillaCalendar("#calendar", {
        type: "month",
        settings: {
            lang: "ru",
        },
        actions: {
            clickMonth(event, month) {
                calendarObj.setActiveMonth(month + 1);
                filteredData.length = 0;
                let filteredDataArr = filterDataForDate();
                if (!filteredDataArr) {
                    filteredData.push(...filteredDataArr);
                }
                generateFilteredPage();
            },
            clickYear(event, year) {
                calendarObj.setActiveYear(year);
                filteredData.length = 0;
                let filteredDataArr = filterDataForDate();
                if (!filteredDataArr) {
                    console.log(filteredDataArr);
                    filteredData.push(...filteredDataArr);
                }
                generateFilteredPage();
            },
        },
    });

    const calendarObj = {
        setActiveMonth(month) {
            addProp("month", month, this);
        },
        setActiveYear(year) {
            addProp("year", year, this);
        },
        getActiveMonth() {
            return getActiveElemDate("month", this);
        },
        getActiveYear() {
            return getActiveElemDate("year", this);
        },
        clean() {
            delete this.date.bigDate;
            delete this.date.smallDate;
            delete this.id;
        },
    };

    const calendarClose = (calendarElem) => {
        calendarElem.animate(newHide, newTiming);
        calendarCrossElem.animate(calendarCrossBack, newTiming);
        calendarIconElem.animate(calendarIconBack, newTiming);
        setTimeout(() => {
            calendarElem.classList.remove("vanilla-calendar_active");
        }, newTiming.duration);
        calendarButton.addEventListener("click", showCalendar, { once: true });
    };

    const dragCalendarHeader = (calendarElem) => {
        const header = calendarElem.querySelector(".vanilla-calendar-header");
        header.addEventListener("mousedown", (event) => {
            let shiftX = event.clientX - calendarElem.getBoundingClientRect().left;
            let shiftY = event.clientY - calendarElem.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                calendarElem.style.left = pageX - shiftX + 'px';
                calendarElem.style.top = pageY - shiftY + 'px';
            }
            const onMouseMove = (event) => {
                moveAt(event.clientX, event.clientY);
            }
            const preventDefault = (e) => {
                e.preventDefault();
            }

            document.addEventListener("selectstart", preventDefault);
            document.addEventListener('mousemove', onMouseMove);

            header.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("selectstart", preventDefault);
                header.onmouseup = null;
            });
        });
    }

    const showCalendar = () => {
        const calendarElem = document.querySelector(".vanilla-calendar");

        dragCalendarHeader(calendarElem);

        calendarElem.classList.add("vanilla-calendar_active");
        calendarElem.animate(newShow, newTiming);
        calendarIconElem.animate(calendarIcon, newTiming);
        calendarCrossElem.animate(calendarCross, newTiming);
        calendarButton.addEventListener("click", () => calendarClose(calendarElem), { once: true });
    }

    const calendarInit = () => {
        calendar.init();
        calendarObj.date = calendar.date.today;
        showCalendar();
    };

    const animateCalendarBtn = () => {
        if (window.scrollY > 0 && !scroll) {
            calendarButton.animate(slidingButton, timingSlidingPagination);
            window.removeEventListener("scroll", animateCalendarBtn);
        }
    }

    window.addEventListener("scroll", animateCalendarBtn);
    calendarButton.addEventListener("click", calendarInit, { once: true });

    return 1;
})();
