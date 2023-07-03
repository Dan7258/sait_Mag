export const utils = (() => {
    const workWithDateAndNumber = (cardsArr) => {
        if (typeof cardsArr == "object") {
            cardsArr = cardsArr.map((i, index) => {
                i.number = cardsArr.length - index;
                i.index = index;
                i.date = {
                    smallDate: new Date(i.date).toLocaleDateString(),
                    bigDate: new Date(i.date).toLocaleDateString("ru-RU", {
                        month: "long",
                        day: "2-digit",
                        year: "2-digit",
                    }),
                    sourceDate: i.date
                };
                return i;
            });
        } else {
            cardsArr = new Date(cardsArr).toLocaleDateString();
        }
        return cardsArr;
    };

    const getMonthFromDate = (date) => {
        return +date.slice(3,5);
    };

    const getYearFromDate = (date) => {
        return +date.slice(-4);
    };

    const sortForDate = (data) => {
        return data.sort((newNumberOne,newNumberTwo) => Date.parse(newNumberOne.date.sourceDate) - Date.parse(newNumberTwo.date.sourceDate)).reverse();
    }

    const escPressed = (e) => {
        return e.key === "Escape";
    };

    const determineActiveId = () => {
        let activeId = "";
        if (window.location.href.match(/id=\d+/)) {
            activeId = window.location.href.match(/id=\d+/)[0].slice(3);
        }
        return activeId;
    };

    const determineActivePage = () => {
        let activePage = 1;
        if (window.location.href.match(/page=\d+/)) {
            activePage = window.location.href.match(/page=\d+/)[0].slice(5);
        }
        return activePage;
    };

    const divideData = (arr,numberOfElements) => {
        return arr.slice(
            (1 - 1) * numberOfElements,
            (1 - 1) * numberOfElements + numberOfElements
        );
    }
    
    const getRandomIntegerDigit = (min,max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const filterPagesForText = (pagesArr) => {
        return pagesArr.filter((i) => +i.firstElementChild.textContent);
    }

    const calculatePaginationNumber = (data,numberOfNewsOnPage) => {
        return Math.ceil(data.length / numberOfNewsOnPage);
    }

    return {
        workWithDateAndNumber,
        determineActiveId,
        determineActivePage,
        divideData,
        getRandomIntegerDigit,
        escPressed,
        filterPagesForText,
        calculatePaginationNumber,
        sortForDate,
        getMonthFromDate,
        getYearFromDate
    };
})();
