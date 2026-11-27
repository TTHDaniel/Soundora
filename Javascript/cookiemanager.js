const cookieModal = document.getElementById('cookieModal');
var areCookiesAccepted;

// if areCookiesAccepted exist get it, if not create it with default value false
function checkForCookieLocalStorage() {

    if (localStorage.getItem("areCookiesAccepted") !== null) {
        areCookiesAccepted = localStorage.getItem("areCookiesAccepted") === "true";
    }
    else{
        localStorage.setItem("areCookiesAccepted", "false");
        areCookiesAccepted = false;
    }
}
checkForCookieLocalStorage();

// show modal if the cookies arent accepted
function showCookieDialog() {
    if (!areCookiesAccepted) {
        setTimeout(() => cookieModal.showModal(), 1000);
    }
}
showCookieDialog();

// this is called by the OK button on the modal
function setCookies() {
    areCookiesAccepted = true;

    // update localstorage
    localStorage.setItem("areCookiesAccepted", "true");
}