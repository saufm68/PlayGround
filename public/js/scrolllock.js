const body = document.querySelector("body");

function scrollLock() {
    console.log('focus')
    window.scrollTo(0,125);
    body.style.overflow = "hidden";
}

window.addEventListener('blur', scrollLock);
window.addEventListener('focus', () => {
    body.style.overflow = "initial";
});