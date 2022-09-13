
// Show ul on clicking HAMBURDER btn
let navToggleBtn = document.querySelector("#toggle-button")
let ulToggle;

navToggleBtn.addEventListener('click', function () {
    ulToggle = document.querySelector("header #main-nav ul");
    if (ulToggle.style.height === 'auto') {
        console.log("height alreday auto")
        document.querySelector("header #main-nav").style.maxHeight = '44px'
        ulToggle.style.height = '0px'
        return
    }
    document.querySelector("header #main-nav").style.maxHeight = 'none'
    ulToggle.style.height = 'auto'
})