let backSection = document.querySelector(".header_img");
const buttonScrollToApply = document.querySelector("button.button_apply");
const form = document.querySelector("form");
const requestMes = document.querySelector(".request_content");
backSection.style.height = window.innerHeight + "px";
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
  document.body.style.overflow = "auto";
  requestMes.classList.remove("request_content_active");
  requestWrap.animate(newHide, newTiming);
  setTimeout(() => {
    try {
      requestMes.removeChild(requestWrap);
    } catch {}
  }, newTiming.duration);
}

function createRequestMessage(request) {
  const requestWrap = document.createElement("div");
  const requestCross = document.createElement("div");
  const crossIcon = document.createElement("img");
  const reqIcon = document.createElement("div");
  const reqImg = document.createElement("img");
  const text = document.createElement("p");

  crossIcon.src = "/static/main/img/Cross_black.svg";

  requestCross.append(crossIcon);
  reqIcon.append(reqImg);
  requestWrap.append(requestCross);
  requestWrap.append(reqIcon);
  requestWrap.append(text);

  requestWrap.classList.add("request_message");
  requestCross.classList.add("request_cross_black");
  crossIcon.setAttribute("alt", "Закрыть окно");
  reqIcon.classList.add("request_icon");
  text.classList.add("request_info");
  requestMes.classList.add("request_content_active");

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeMessage(requestMes,requestWrap);
    }
  },{ once: true });
  crossIcon.addEventListener("click", () => removeMessage(requestMes,requestWrap));
  requestMes.addEventListener("click", (e) => {
    if (e.target === requestMes) {
      removeMessage(requestMes,requestWrap);
    }
  });

  requestWrap.animate(newShow, newTiming);

  if (request) {
    reqImg.setAttribute("alt", "Отлично");
    reqImg.src = "/static/main/img/Woosh.svg";
    text.textContent = "Ваша заявка успешно отправлена!";
    document.body.style.overflow = "hidden";
  } else {
    reqImg.setAttribute("alt", "Ошибка");
    reqImg.src = "/static/main/img/Cross.svg";
    text.textContent = "Что-то пошло не так. Попробуйте ещё раз...";
    document.body.style.overflow = "hidden";
  }

  return requestWrap;
}

function scrollToApply() {
  let sections = document.querySelectorAll(".hidden_block");
  buttonScrollToApply.addEventListener("click", () => {
    let request = document.querySelector(".request");
    if (
      request.classList.contains("active_block") ||
      request.classList.contains("active_sudden_block")
    ) {
      request.scrollIntoView({ behavior: "smooth" });
    } else {
      sections.forEach((i) => {
        i.classList.remove("hidden_block");
        i.classList.add("active_sudden_block");
      });
      request.scrollIntoView({ behavior: "smooth" });
    }
  });
}
setTimeout(() => scrollToApply(), 0);
function arrowBtnUp() {
  const arrowBtn = document.querySelector(".arrow_to_top");
  function toggleActiveArrowBtnUp() {
    const arrowToUp = document.querySelector(".arrow.up");
    arrowBtn.addEventListener("mouseover", () => {
      arrowBtn.classList.toggle("arrow_to_top_active");
      arrowToUp.classList.toggle("arrow_active");
    });
    arrowBtn.addEventListener("mouseout", () => {
      arrowBtn.classList.toggle("arrow_to_top_active");
      arrowToUp.classList.toggle("arrow_active");
    });
  }
  toggleActiveArrowBtnUp();
  function showArrowBtnUp() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 900) {
        arrowBtn.classList.add("arrow_to_top_show");
      } else {
        arrowBtn.classList.remove("arrow_to_top_show");
      }
    });
  }
  showArrowBtnUp();
  arrowBtn.addEventListener("click", () => {
    document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
  });
}
arrowBtnUp();
function smoothAppear(classBlock) {
  let block = document.querySelector(classBlock);
  block.classList.add("hidden_block");
  window.addEventListener("scroll", () => {
    if (
      !(document.body.clientHeight - block.getBoundingClientRect().top < 130)
    ) {
      setTimeout(() => {
        block.classList.remove("hidden_block");
        block.classList.add("active_block");
      }, 100);
    }
  });
}
smoothAppear(".partners");
smoothAppear(".more");
smoothAppear(".ed_programme > .div_wrap");
smoothAppear(".digits_wrap");
smoothAppear(".request");
function navBarOn() {
  let dropDownbtn = Array.from(document.querySelectorAll(".dropdown-toggle")),
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
    dropDownbtn.forEach((i) => {
      i.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    });
  }
  function dropDownToggleHidden() {
    document.addEventListener("click", (e) => {
      if (
        e.target != dropDownbtn[1] &&
        e.target != dropDownbtn[0] &&
        menu.classList.contains("active")
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
