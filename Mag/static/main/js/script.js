const buttonScrollToApply = document.querySelector(
    "button.start-section__apply"
);
const form = document.querySelector("form.apply__form");
const requestMes = document.querySelector(".apply__wrap");
const headerApply = document.querySelector(".header__apply");
const hamburger = document.querySelector(".header__hamburger");
const crossHamburger = document.querySelector(
    ".hamburger__list .header__list-item:last-child"
);
const hamburgerWrap = document.querySelector(".hamburger__wrap");
const hamburgerList = document.querySelector(".hamburger__list");
const applyPlus = document.querySelector(".start-section__apply-img");
const applyStartBtn = document.querySelector(".start-section__apply");
const arrowToTop = document.querySelector(".arrow_to_top");

arrowToTop.addEventListener('mouseover', () => {
    const img = arrowToTop.firstElementChild;
    img.src = `http://127.0.0.1:8000/static/main/img/arrow_active.svg`;
});

arrowToTop.addEventListener('mouseout', () => {
    const img = arrowToTop.firstElementChild;
    img.src = `http://127.0.0.1:8000/static/main/img/arrow_up.svg`;
});

applyStartBtn.addEventListener('mouseover', () => {
    applyPlus.src = `http://127.0.0.1:8000/static/main/img/plus__white.png`;
});

applyStartBtn.addEventListener('mouseout', () => {
    applyPlus.src = `http://127.0.0.1:8000/static/main/img/plus.png`;
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("", {
            method: "POST",
            body: new FormData(form),
        });
        const req = await res.json();
        requestMes.append(createRequestMessage(req.success));
    } catch {
        requestMes.append(createRequestMessage(false));
    }
    form.reset();
});

const newShow = [
    {
        opacity: "0",
        transform: "translate(-50%,-200px)",
    },
    {
        opacity: "1",
        transform: "translate(-50%,-50%)",
    },
];

const newHide = [
    {
        opacity: "1",
        transform: "translate(-50%,-50%)",
    },
    {
        opacity: "0",
        transform: "translate(-50%,-200px)",
    },
];

const newTiming = {
    duration: 270,
    fill: "forwards",
};

function removeMessage(requestMes, requestWrap) {
    requestWrap.animate(newHide, newTiming);
    setTimeout(() => {
        try {
            document.body.style.overflow = "auto";
            requestMes.classList.remove("apply__wrap_active");
            requestMes.removeChild(requestWrap);
        } catch {}
    }, newTiming.duration);
}

function createRequestMessage(request) {
    const requestWrap = document.createElement("div");
    const requestHeader = document.createElement("div");
    const requestHeaderContent = document.createElement("div");
    const requestLogo = document.createElement("div");
    const requestImg = document.createElement("img");
    const requestTitle = document.createElement("p");
    const requestMain = document.createElement("div");
    const requestAbitur = document.createElement("p");
    const requestInfo = document.createElement("p");
    const requestCross = document.createElement("div");
    const crossIcon = document.createElement("img");
    const reqIcon = document.createElement("div");
    const reqImg = document.createElement("img");
    const text = document.createElement("p");

    crossIcon.src = "/static/main/img/cross_window.svg";

    requestHeader.append(requestHeaderContent);
    requestHeaderContent.append(requestLogo);
    requestLogo.append(requestImg);
    requestHeaderContent.append(requestTitle);
    requestHeader.append(requestCross);
    requestCross.append(crossIcon);
    requestMain.append(requestAbitur);
    requestMain.append(requestInfo);
    requestMain.append(reqIcon);
    reqIcon.append(reqImg);
    requestWrap.append(requestHeader);
    requestWrap.append(requestMain);
    requestWrap.append(text);

    requestMes.classList.add("apply__wrap_active");
    requestWrap.classList.add("apply__message");
    requestHeader.classList.add("request__header");
    requestHeaderContent.classList.add("request__header-content");
    requestLogo.classList.add("request__logo");
    requestImg.classList.add("request__img");
    requestTitle.classList.add("request__title");
    requestCross.classList.add("request_cross_black");
    requestMain.classList.add("request__main");
    requestAbitur.classList.add("request__abitur");
    requestInfo.classList.add("request_info");
    reqIcon.classList.add("request_icon");
    text.classList.add("request__end");

    requestTitle.textContent = `Abiturient@HIGHLOAD:~`;
    requestAbitur.innerHTML = `Abiturient@HIGHLOAD:<span>~$ sudo input</span>`;
    text.innerHTML = `Abiturient@HIGHLOAD:<span>~$</span>`;
    requestImg.src = "/static/main/img/logo_mai.png";

    window.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Escape") {
                removeMessage(requestMes, requestWrap);
            }
        },
        { once: true }
    );
    requestCross.addEventListener("click", () =>
        removeMessage(requestMes, requestWrap)
    );
    requestMes.addEventListener("click", (e) => {
        if (e.target === requestMes) {
            removeMessage(requestMes, requestWrap);
        }
    });

    requestWrap.animate(newShow, newTiming);

    if (request) {
        reqImg.setAttribute("alt", "Отлично");
        reqImg.src = "/static/main/img/whoosh.png";
        requestInfo.textContent = "Ваша заявка успешно отправлена!";
        document.body.style.overflow = "hidden";
    } else {
        reqImg.setAttribute("alt", "Ошибка");
        reqImg.src = "/static/main/img/cross.png";
        requestInfo.textContent = "Что-то пошло не так. Попробуйте ещё раз...";
        document.body.style.overflow = "hidden";
    }

    return requestWrap;
}

headerApply.addEventListener("click", (e) => {
    e.preventDefault();
    let request = document.querySelector(".apply__text");
    request.scrollIntoView({ behavior: "smooth" });
});

buttonScrollToApply.addEventListener("click", () => {
    let request = document.querySelector(".apply__text");
    request.scrollIntoView({ behavior: "smooth" });
});

function arrowBtnUp() {
    const arrowBtn = document.querySelector(".arrow_to_top");
    function showArrowBtnUp() {
        let isExecuted = false;
        const newShow = [
            {
                bottom: "-150px",
                right: "100px",
            },
            {
                bottom: "50px",
                right: "100px",
            },
        ];
        const smallShow = [
            {
                bottom: "-150px",
                right: "100px",
            },
            {
                bottom: "20px",
                right: "40px",
            },
        ];
        window.addEventListener("scroll", remoteScroll);
        function remoteScroll() {
            if (window.scrollY > 900 && !isExecuted) {
                if (window.innerWidth < 1024) {
                    arrowBtn.animate(smallShow, newTiming);
                } else {
                    arrowBtn.animate(newShow, newTiming);
                }
                isExecuted = true;
            }
        }
    }
    showArrowBtnUp();
    arrowBtn.addEventListener("click", () => {
        document
            .querySelector(".header")
            .scrollIntoView({ behavior: "smooth" });
    });
}
arrowBtnUp();

hamburger.addEventListener("click", (e) => {
    hamburgerWrap.style.display = "block";
    hamburgerList.classList.add("active");
    document.body.style.overflow = "hidden";
    if (e.target.alt === "Закрыть меню" || e.target === hamburgerWrap) {
        document.body.style.overflow = "auto";
        hamburgerList.classList.remove("active");
        hamburgerWrap.style.display = "none";
    }
}, {capture: true});
