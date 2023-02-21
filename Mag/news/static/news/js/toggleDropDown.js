export const toggleDropDown = (() => {
    const dropDownbtn = document.querySelector(".dropdown-toggle");
    const icons = document.querySelectorAll(".social_card");
    const menu = document.querySelector(".dropdown-menu");

    const switchSocialColor = () => {
        icons.forEach((card) => {
            const img = card.firstElementChild.firstElementChild;
            card.addEventListener("mouseover", () => {
                img.src = "/static/main/img/" + img.alt + "_or.svg";
            });
            card.addEventListener("mouseout", () => {
                img.src = "/static/main/img/" + img.alt + ".svg";
            });
        });
    };

    const showDropDown = () => {
        dropDownbtn.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    };

    const hiddenDropDown = () => {
        document.addEventListener("click", (e) => {
            if (menu.classList.contains("active") && e.target != dropDownbtn) {
                menu.classList.remove("active");
            }
        });
        document.addEventListener("keydown", (e) => {
            if (menu.classList.contains("active") && e.key == "Escape") {
                menu.classList.remove("active");
            }
        });
    }
    
    const animateHeader = () => {
        switchSocialColor();
        showDropDown();
        hiddenDropDown();
    }

    return animateHeader;
})();