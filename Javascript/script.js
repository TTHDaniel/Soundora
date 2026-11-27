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






const trendingrecordsElement = document.getElementById("trendingrecords")
const bestsellingrecordsElement = document.getElementById("bestsellingrecords")


// Albumok betoltese a data valtozoba, a /Data/albums.json-bol async funkcio hasznalataval
let data = []
async function loadAlbums() {
    try {
        const response = await fetch("/Data/albums.json");
        data = await response.json();
        // console.log(data);
        trendingRecordsRender();
        bestsellingRecordsRender();

    } catch (error) {
        console.error("Failed to load albums:", error);
    }
}
loadAlbums();


//Trending recordok megjelenítése szokásos módszerrel. 

//Ha a title vagy artist nev hosszabb mint a megadott karakter(25,35) akkor ...-ot rak a végére
function trendingRecordsRender() {
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList = "col";
        if (element.title == "Thriller" || element.title == "Flower In A Hurricane [From GTAVI: Original Score] - Single" || element.title == "Homework" || element.title == "Big Fish Theory") {
            console.log(element)
            div.innerHTML = `
                <div class="card rounded-0">
                <img src="${element.artworkUrl}" class="card-img-top rounded-0 p-5" alt="${element.artworkUrl}}">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between gap-3">
                        <div>
                            <h4 class="card-title">${element.title.length > 25 ? element.title.slice(0, 25) + '...' : element.title}</h4>
                            <p class="card-text mb-0">${element.artist.length > 35 ? element.artist.slice(0, 35) + '...' : element.artist}</p>
                        </div>
                        <button class="btn rounded-0 d-flex align-items-center justify-content-center cartbuttom" type="button">
                            <img src="Assets/Icons/add.png" alt="" width="20" height="20">
                        </button>
                    </div>
                </div>
            </div>
                
                `
                trendingrecordsElement.appendChild(div)
        }


    });
}

function bestsellingRecordsRender() {
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList = "col";
        if (element.title == "All Eyez On Me" || element.title == "ICEMAN" || element.title == "good kid, m.A.A.d city (Deluxe Version)" || element.title == "Binary - Single") {
            console.log(element)
            div.innerHTML = `
                <div class="card rounded-0">
                <img src="${element.artworkUrl}" class="card-img-top rounded-0 p-5" alt="${element.artworkUrl}}">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between gap-3">
                        <div>
                            <h4 class="card-title">${element.title.length > 25 ? element.title.slice(0, 25) + '...' : element.title}</h4>
                            <p class="card-text mb-0">${element.artist.length > 35 ? element.artist.slice(0, 35) + '...' : element.artist}</p>
                        </div>
                        <button class="btn rounded-0 d-flex align-items-center justify-content-center cartbuttom" type="button">
                            <img src="Assets/Icons/add.png" alt="" width="20" height="20">
                        </button>
                    </div>
                </div>
            </div>
                
                `
                bestsellingrecordsElement.appendChild(div)
        }


    });
}




