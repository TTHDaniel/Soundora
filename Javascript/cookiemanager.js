const cookieModal = new bootstrap.Modal(document.getElementById('cookieModal'));
var areCookiesAccepted;

function checkForCookieLocalStorage() {
    // if areCookiesAccepted exist get it, if not create it with default value false

    if (localStorage.getItem("areCookiesAccepted") !== null) {
        areCookiesAccepted = localStorage.getItem('highScore');
    }
    else{
        localStorage.setItem("areCookiesAccepted", false)
    }
}

// funcio ami megjelkeniti a modalt illetve checkolja hogy lehetik-e (meghivja a checkForCookieLocalStorage-t)