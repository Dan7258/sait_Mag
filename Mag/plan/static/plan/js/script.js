'use strict';
document.addEventListener('DOMContentLoaded', () => {
    function navBarOn() {
        let dropDownbtn = document.querySelector('.dropdown-toggle'),
            menu =  document.querySelector('.dropdown-menu');
        function switchSocialColor() {
            let icons = document.querySelectorAll('.social_card');
            icons.forEach((card) => {
                let img = card.firstElementChild.firstElementChild;
                card.addEventListener('mouseover', () => {
                    img.src = "/static/main/img/" + img.alt + "_or.svg";
                })
                card.addEventListener('mouseout', () => {
                    img.src = "/static/main/img/" + img.alt + ".svg";
                });
            });
        }
        function dropDownToggleForward() {
            dropDownbtn.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
        function dropDownToggleHidden() {
            document.addEventListener('click' , (e) => {
                if (menu.classList.contains('active') && e.target != dropDownbtn) {
                    menu.classList.remove('active');
                }
            })
            document.addEventListener('keydown' , (e) => {
                if (menu.classList.contains('active') && e.key == 'Escape') {
                    menu.classList.remove('active');
                }
            })
        }
        dropDownToggleForward();
        dropDownToggleHidden();
        switchSocialColor();
    }
    navBarOn();
});