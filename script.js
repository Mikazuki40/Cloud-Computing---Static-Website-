/* =========================================
   LOBOTOMY CORPORATION
   ABNORMALITY ARCHIVE
   JAVASCRIPT
   ========================================= */


/* =========================================
   LIVE CLOCK
   REQUIRED FEATURE #1
   ========================================= */

function updateClock() {

    const clock = document.getElementById("liveClock");

    const now = new Date();

    let hours = now.getHours();

    const minutes = String(now.getMinutes()).padStart(2, "0");

    const seconds = String(now.getSeconds()).padStart(2, "0");

    let period = "AM";

    if (hours >= 12) {

        period = "PM";

    }

    hours = hours % 12;

    if (hours === 0) {

        hours = 12;

    }

    hours = String(hours).padStart(2, "0");

    clock.textContent =
        "CURRENT TIME: " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        period;
}


/* Update every second */

updateClock();

setInterval(updateClock, 1000);



/* =========================================
   COUNTDOWN TIMER
   REQUIRED FEATURE #2
   ========================================= */

/*
   Event date:
   January 1, 2027
*/

const countdownDate =
    new Date("January 1, 2027 00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = countdownDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =========================================
   NAVIGATION
   ========================================= */

const navigationButtons =
    document.querySelectorAll(".nav-button");


const sections =
    document.querySelectorAll(".page-section");


const currentSection =
    document.getElementById("currentSection");


navigationButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const sectionName =
            button.getAttribute("data-section");


        showSection(sectionName);


        /* Close mobile menu */

        document
            .getElementById("sidebar")
            .classList.remove("mobile-open");

    });

});


function showSection(sectionName) {

    /* Hide all sections */

    sections.forEach(function(section) {

        section.classList.remove("active-section");

    });


    /* Show selected section */

    const selectedSection =
        document.getElementById(sectionName);


    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    /* Update navigation */

    navigationButtons.forEach(function(button) {

        button.classList.remove("active");


        if (
            button.getAttribute("data-section")
            === sectionName
        ) {

            button.classList.add("active");

        }

    });


    /* Update top bar */

    currentSection.textContent =
        sectionName.toUpperCase();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   ACCESS DATABASE BUTTON
   REQUIRED INTERACTIVE FEATURE #3
   ========================================= */

function openArchive() {

    showSection("archive");

}


/* =========================================
   CLASSIFIED INFORMATION
   ADDITIONAL FEATURE
   ========================================= */

const classifiedButton =
    document.getElementById("classifiedButton");


const classifiedMessage =
    document.getElementById("classifiedMessage");


classifiedButton.addEventListener(
    "click",
    function() {

        classifiedMessage.classList.toggle("show");


        if (
            classifiedMessage.classList.contains("show")
        ) {

            classifiedButton.textContent =
                "HIDE CLASSIFIED NOTICE";

        } else {

            classifiedButton.textContent =
                "SHOW CLASSIFIED NOTICE";

        }

    }
);



/* =========================================
   SEARCH FUNCTION
   ADDITIONAL FEATURE
   ========================================= */

const searchInput =
    document.getElementById("searchInput");


const riskFilter =
    document.getElementById("riskFilter");


const abnormalityCards =
    document.querySelectorAll(".abnormality-card");


const noResults =
    document.getElementById("noResults");


function filterAbnormalities() {

    const searchText =
        searchInput.value.toLowerCase();


    const selectedRisk =
        riskFilter.value;


    let visibleCards = 0;


    abnormalityCards.forEach(function(card) {

        const name =
            card.getAttribute("data-name").toLowerCase();


        const risk =
            card.getAttribute("data-risk");


        const matchesSearch =
            name.includes(searchText);


        const matchesRisk =
            selectedRisk === "all"
            || risk === selectedRisk;


        if (
            matchesSearch &&
            matchesRisk
        ) {

            card.style.display = "flex";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCards === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchInput.addEventListener(
    "input",
    filterAbnormalities
);


riskFilter.addEventListener(
    "change",
    filterAbnormalities
);



/* =========================================
   RECORD MODAL
   ADDITIONAL FEATURE
   ========================================= */

function showDetails(
    name,
    code,
    risk,
    description
) {

    document.getElementById("modalName")
        .textContent = name;


    document.getElementById("modalCode")
        .textContent = code;


    document.getElementById("modalRisk")
        .textContent = risk;


    document.getElementById("modalDescription")
        .textContent = description;


    document.getElementById("recordModal")
        .classList.add("show");

}


function closeDetails() {

    document.getElementById("recordModal")
        .classList.remove("show");

}


/* Close modal by clicking outside */

document.getElementById("recordModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeDetails();

        }

    });



/* =========================================
   RANDOM ANGELA / FACILITY MESSAGE
   ADDITIONAL FEATURE
   ========================================= */

const facilityMessages = [

    "Please remain calm and follow facility procedures.",

    "Your access level has been verified.",

    "Remember to complete your assigned work carefully.",

    "The facility database is currently operational.",

    "Unauthorized access to classified records is prohibited.",

    "Please report unusual facility activity to the appropriate department.",

    "Archive synchronization has been completed."

];


function generateRandomMessage() {

    const randomIndex =
        Math.floor(
            Math.random() * facilityMessages.length
        );


    document.getElementById("randomMessage")
        .textContent =
        facilityMessages[randomIndex];

}



/* =========================================
   ANGELA CHAT
   ADDITIONAL FEATURE
   ========================================= */

function sendMessage() {

    const input =
        document.getElementById("angelaInput");


    const message =
        input.value.trim();


    if (message === "") {

        return;

    }


    const chat =
        document.getElementById("chatMessages");


    /* User message */

    const userMessage =
        document.createElement("div");


    userMessage.className =
        "message user-message";


    userMessage.innerHTML =
        "<strong>USER:</strong>" +
        "<p>" +
        escapeHTML(message) +
        "</p>";


    chat.appendChild(userMessage);


    /* Angela response */

    const response =
        getAngelaResponse(message);


    const angelaMessage =
        document.createElement("div");


    angelaMessage.className =
        "message angela-message";


    angelaMessage.innerHTML =
        "<strong>ANGELA:</strong>" +
        "<p>" +
        response +
        "</p>";


    chat.appendChild(angelaMessage);


    input.value = "";


    /* Scroll to newest message */

    chat.scrollTop =
        chat.scrollHeight;

}


/* Angela response */

function getAngelaResponse(message) {

    const lowerMessage =
        message.toLowerCase();


    if (lowerMessage.includes("hello")
        || lowerMessage.includes("hi")) {

        return "Greetings. Welcome to the facility archive.";

    }


    if (lowerMessage.includes("abnormality")) {

        return "The archive contains records classified according to facility risk levels.";

    }


    if (lowerMessage.includes("help")) {

        return "You may browse the Abnormalities section or use the search and filtering functions.";

    }


    if (lowerMessage.includes("time")) {

        return "The current facility time is displayed at the bottom of the terminal.";

    }


    if (lowerMessage.includes("github")) {

        return "This website can be published using GitHub Pages.";

    }


    return "Your request has been received. Please consult the facility archive for additional information.";

}


/* Prevent HTML injection in chat */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


/* Press Enter to send */

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}



/* =========================================
   THEME TOGGLE
   ADDITIONAL FEATURE
   ========================================= */

const themeButton =
    document.createElement("button");


themeButton.textContent =
    "LIGHT MODE";


themeButton.className =
    "secondary-button";


themeButton.style.position =
    "fixed";


themeButton.style.bottom =
    "20px";


themeButton.style.right =
    "20px";


themeButton.style.zIndex =
    "1200";


document.body.appendChild(themeButton);


themeButton.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light-theme"
        );


        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            themeButton.textContent =
                "DARK MODE";

        } else {

            themeButton.textContent =
                "LIGHT MODE";

        }

    }
);



/* =========================================
   MOBILE MENU
   ADDITIONAL FEATURE
   ========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");


mobileMenuButton.addEventListener(
    "click",
    function() {

        document
            .getElementById("sidebar")
            .classList.toggle("mobile-open");

    }
);



/* =========================================
   DYNAMIC ABNORMALITY COUNTER
   ADDITIONAL FEATURE
   ========================================= */

const count =
    abnormalityCards.length;


document.getElementById(
    "abnormalityCount"
).textContent = count;