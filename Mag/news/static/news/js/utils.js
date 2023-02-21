export const utils = (() => {

    const workWithDate = (cardsArr) => {
        cardsArr = cardsArr.map((i, index) => {
            i.id = cardsArr.length - index;
            i.date = {
                smallDate: new Date(i.date).toLocaleDateString(),
                bigDate: new Date(i.date).toLocaleDateString("ru-RU", {
                    month: "long",
                    day: "2-digit",
                    year: "2-digit",
                }),
            };
            return i;
        });
        return cardsArr;
    };

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

    return {
        workWithDate,
        determineActiveId,
        determineActivePage,
        divideData,
        getRandomIntegerDigit,
        escPressed
    };
})();
