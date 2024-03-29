import { contants } from "./constants.js";
import { getData } from "./getData.js";
import { utils } from "./utils.js";

export const createOverlayCard = (() => {
  const {
    NUMBER_OF_NEWS_ON_PAGE,
    ACTIVE_ID_NUMBER,
    pageObject,
    newShow,
    newTiming,
    newHide,
    MEDIA_URL,
  } = contants;
  const { getRandomIntegerDigit, escPressed, sortForDate } = utils;

  let activeCard;
  let cardWrapClick;

  const openActiveIdOverlayCard = async () => {
    const data = sortForDate((await getData("/news/data")).data);
    if (ACTIVE_ID_NUMBER != "") {
      const activeCard = data.find((item) => item.id === ACTIVE_ID_NUMBER);
      insertOverlayElement(activeCard);
    }
  };

  const removeActiveCard = (parentElement, childElement) => {
    document.body.style.overflowY = "scroll";
    history.pushState(null, null, `/news/page/${pageObject.activeScrollSection}`);
    parentElement.removeEventListener("click", cardWrapClick);
    childElement.animate(newHide, newTiming);
    setTimeout(() => {
      try {
        parentElement.removeChild(childElement);
      } catch {}
    }, newTiming.duration);
  };

  const animateActiveCard = async (cardWrap, card, data) => {
    card.animate(newShow, newTiming);
    window.addEventListener(
      "keydown",
      (e) => (escPressed(e) ? removeActiveCard(cardWrap, card) : ""),
      { once: true }
    );

    const cardWrapClick = (e) => {
      if (
        e.target.tagName === "IMG" &&
        e.target.parentElement.classList.contains("section_close")
      ) {
        removeActiveCard(cardWrap, card);
      } else if (e.target.classList.contains("section_list-item")) {
        removeActiveCard(cardWrap, card);
        data.forEach((i) => {
          if (i.title == e.target.textContent) {
            insertOverlayElement(i);
          }
        });
      }
    };

    cardWrap.addEventListener("click", cardWrapClick);
    slideGallery();
    return cardWrapClick;
  };

  const slideGallery = () => {
    const gallery = document.querySelector(".section_gallery");
    const rightArr = document.querySelector(".section_arrow_right");
    const leftArr = document.querySelector(".section_arrow_left");
    const gallWrap = document.querySelector(".section_gallery-wrap");
    const imgsLength = gallery.querySelectorAll("img").length - 1;
    let currImg = 0;

    rightArr?.addEventListener("click", () => {
      if (imgsLength > currImg) {
        currImg += 1;
        gallWrap.style.transform = `translateX(${-873 * currImg}px)`;
      }
    });

    leftArr?.addEventListener("click", () => {
      if (currImg > 0) {
        currImg -= 1;
        gallWrap.style.transform = `translateX(${-873 * currImg}px)`;
      }
    });
  };

  const createRandomLinks = async (amountOfLinks) => {
    const data = await getData("/news/data");
    const numbers = [];
    const usedNumbers = [activeCard.index];
    for (let i = 0; i < amountOfLinks; i++) {
      if (usedNumbers.length != data.data.length) {
        const digit = getRandomIntegerDigit(0, data.data.length);
        if (usedNumbers.includes(digit)) {
          i--;
        } else {
          numbers[i] = data.data[digit];
          usedNumbers.push(digit);
        }
      } else {
        numbers.push({ title: "Нет подходящей новости..." });
      }
    }
    return numbers;
  };

  const createArrows = () => `<div class="section_arrow_left">
                                <img src="/static/news/img/arrow.svg">
                              </div>
                              <div class="section_arrow_right">
                                <img src="/static/news/img/arrow.svg">
                              </div>`;

  const createOverlayElement = async (cardData) => {
    activeCard = {
      title: cardData.title,
      number: cardData.number,
      index: cardData.index,
    };
    cardData.body = cardData.body
      .split("\n")
      .filter((item) => item != "\r")
      .map((item) => `<p>${item}</p>`)
      .join("");
    history.pushState(
      null,
      null,
      `/news/page/${Math.ceil(activeCard.number / NUMBER_OF_NEWS_ON_PAGE)}/id/${
        cardData.id
      }`
    );
    const gallery = cardData.photo.map(
      (_, index) =>
        `<div><img src="${MEDIA_URL + cardData.photo[index]}"></div>`
    );
    const links = await createRandomLinks(3);
    let newOverlayElem = `<div data-before="${
      cardData.date.bigDate
    }" class="section_card active">
                <div class="section_card-content active">
                    <h2 class="section_header active">
                        ${cardData.title}
                    </h2>
                    <div class="section_content active">
                        <div class="section_img active">
                          <div class="section_gallery">
                            <div class="section_gallery-wrap">
                              ${gallery.join("")}
                            </div>
                          </div>
                          ${cardData.photo.length > 1 ? createArrows() : ""}
                        </div>
                        <div class="section_list active">
                            <h3 class="section_list-header active">
                                Другие новости:
                            </h3>
                            <ul>
                                <li class="section_list-item active">${
                                  links[0].title
                                }</li>
                                <li class="section_list-item active">${
                                  links[1].title
                                }</li>
                                <li class="section_list-item active">${
                                  links[2].title
                                }</li>
                            </ul>
                        </div>
                    </div>
                    <div class="section_desc active">
                        ${cardData.body}
                    </div>
                    </div>
                <div class="section_close">
                    <img src="/static/news/img/Close_round.svg"> 
                </div>
            </div>`;
    return [newOverlayElem, links];
  };

  async function insertOverlayElement(cardData) {
    const [newOverlayElem, linksData] = await createOverlayElement(cardData);
    const wrap = document.querySelector(".section .div_wrap");
    wrap.insertAdjacentHTML("afterbegin", newOverlayElem);
    document.body.style.overflow = "hidden";
    const newOverlay = wrap.firstChild;
    const newOverlayContent = newOverlay.querySelector(".section_card-content");
    const newOverlayDesc = newOverlay.querySelector(".section_desc");
    const contentHeight = newOverlayDesc.clientHeight;
    if (contentHeight > 114) {
      newOverlay.style.height = "100%";
      newOverlayContent.style.overflowY = "scroll";
    }
    animateActiveCard(wrap, newOverlay, linksData);
  }

  const openOverlayCard = (cardData) => {
    const cards = document.querySelectorAll(".section_card");
    cards.forEach((i, ind) => {
      i.addEventListener("click", async () => {
        insertOverlayElement(cardData[ind]);
      });
    });
  };

  return {
    openOverlayCard,
    openActiveIdOverlayCard,
  };
})();
