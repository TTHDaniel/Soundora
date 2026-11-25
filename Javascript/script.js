// searchbar animáció
const searchBar = document.querySelector('input[type="search"]');
const phrases = [
    "Search for anything",
    "Search for your favourite songs",
    "Search for something new",
    "Search for inspiration",
    "Search for whatever you like",
    "Search for your next adventure"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    searchBar.placeholder = currentPhrase.substring(0, charIndex);
    if (!isDeleting && charIndex < currentPhrase.length) {
        charIndex++;
        setTimeout(typeWriter, 80);
    } 
    else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeWriter, 40);
    } 
    else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(typeWriter, 800);
    }
}
typeWriter();
