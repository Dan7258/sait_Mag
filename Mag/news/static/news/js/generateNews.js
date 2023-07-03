import { utils } from "./utils.js";
import { contants } from "./constants.js";
import { createOverlayCard } from "./createOverlayCard.js";

export const generateNews = (() => {
    
    const { divideData } = utils;
    const { ACTIVE_PAGE_NUMBER } = contants;
    const { openOverlayCard } = createOverlayCard;

    const determineColumnClass = (ind) => {
        const index = ind % 6;

        let big = true;
        let classes = ".";

        if (index < 2) {
            classes += "section_big-column";
        } else {
            big = false;
            classes += "section_small-column";
        }
        return [big, classes];
    };

    const createCardNew = (cardData, index) => {
        const card = document.createElement("div");
        const imgWrap = document.createElement("div");
        const img = document.createElement("img");
        const txt = document.createElement("div");
        const header = document.createElement("h2");
        const desc = document.createElement("p");
        const [big, classes] = determineColumnClass(index);
        const date = big ? cardData.date.bigDate : cardData.date.smallDate;
        const descriptionContent = big ? cardData.body.slice(0, 70) + "..." : "";

        card.classList.add("section_card");
        card.setAttribute("data-before", date);
        imgWrap.classList.add("section_img");
        img.src = cardData.photo;
        txt.classList.add("section_txt");
        header.classList.add("section_header");
        header.textContent = cardData.title;
        desc.classList.add("section_desc");
        desc.textContent = descriptionContent;

        card.append(imgWrap);
        card.append(txt);
        imgWrap.append(img);
        txt.append(header);
        txt.append(desc);

        return [card, classes];
    };

    const createCardNewsPart = () => {
        const sectionPart = document.createElement("div");
        sectionPart.classList.add("section_part");
        return sectionPart;
    };

    const createCardColumns = () => {
        const bigColumn = document.createElement("div");
        const smallColumn = document.createElement("div");
        bigColumn.classList.add("section_column", "section_big-column");
        smallColumn.classList.add("section_column", "section_small-column");
        return [bigColumn, smallColumn];
    };

    const createCardSection = (sectionNumber) => {
        const partArr = [];
        const sectionGrid = document.querySelector(".section_grid");
        for (let i = 1; i <= sectionNumber; i++) {
            const sectionPart = createCardNewsPart();
            const [bigColumn, smallColumn] = createCardColumns();
            if (i % 2 == 0) {
                sectionPart.classList.add("section_part-two");
                sectionPart.append(smallColumn, bigColumn);
            } else {
                sectionPart.classList.add("section_part-one");
                sectionPart.append(bigColumn, smallColumn);
            }
            sectionGrid.append(sectionPart);
            partArr.push(sectionPart);
        }
        return partArr;
    }

    const createListCardNews = async (data,numberOfNews) => {
        const cardsDataArr = divideData(
            data,
            numberOfNews * ACTIVE_PAGE_NUMBER
        );
        const sectionNumber = Math.ceil(cardsDataArr.length / 3);
        const partArr = createCardSection(sectionNumber);

        let count = 0;

        cardsDataArr.forEach((cardData, index) => {
            const [card, classes] = createCardNew(cardData, index + 1);
            const section = partArr[count];
            const part = section.querySelector(classes);
            const ind = index + 1;

            part.append(card);
            if (ind % 3 == 0) {
                count++;
            }
        });
        openOverlayCard(cardsDataArr);
    };

    return createListCardNews;
})();
