// searchbar animacio loop
const searchBar = document.querySelector('input[type="search"]');
const phrases = [
    "search for anything",
    "search for your favourite songs",
    "search for something new",
    "search for inspiration",
    "search for whatever you like",
    "search for your next adventure"
];
const trendingrecordsElement = document.getElementById("trendingrecordsElement")
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

let data = fetch("/albumsraw") // ez it minek van??? -dani
console.log(data); // ez it minek van??? -dani

function typeWriter() {
    const currentPhrase = phrases[phraseIndex]; //jelenleg kivalasztott mondat

    searchBar.placeholder = currentPhrase.substring(0, charIndex); // feldarabolja a mondatto
    if (!isDeleting && charIndex < currentPhrase.length) { // nem torol semmit ES meg nem vegzett
        charIndex++;
        setTimeout(typeWriter, 80); // ujra meghivja magat delayel + egy karakterrel tobbel
    } 
    else if (isDeleting && charIndex > 0) { // ugyanaz csak kitotr
        charIndex--;
        setTimeout(typeWriter, 40);
    } 
    else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
            phraseIndex = (phraseIndex + 1) % phrases.length; // ha az animacio a vegere er akkor a legelejerol kezdje a kovetkezot
        }

        setTimeout(typeWriter, 800); // delay aztan mehet ujra az egesz folyamat
    }
}
typeWriter();





