/* ------------------------------
   PAGE NAVIGATION
------------------------------ */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(function(section) {

        section.classList.add("hidden");

    });


    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }

}


/* ------------------------------
   NAVIGATION LINKS
------------------------------ */

document.querySelectorAll(".sidebar nav a")
    .forEach(function(link) {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            const sectionId =
                link.getAttribute("href").substring(1);

            showSection(sectionId);

        });

    });


/* ------------------------------
   SEARCH ABNORMALITIES
------------------------------ */

function searchAbnormalities() {

    const input =
        document.getElementById("searchInput");

    const searchText =
        input.value.toLowerCase();

    const cards =
        document.querySelectorAll(".abnormality-card");


    cards.forEach(function(card) {

        const name =
            card.getAttribute("data-name");

        if (name.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* ------------------------------
   ANGELA CHAT
------------------------------ */

function talkToAngela() {

    const input =
        document.getElementById("angelaInput");

    const message =
        input.value.trim();


    if (message === "") {

        return;

    }


    const messageContainer =
        document.getElementById("angelaMessages");


    /* User message */

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "angela-message";


    userMessage.innerHTML =
        "<strong>MANAGER:</strong>" +
        "<p>" + message + "</p>";


    messageContainer.appendChild(userMessage);


    /* Angela response */

    const response =
        getAngelaResponse(message);


    const angelaMessage =
        document.createElement("div");

    angelaMessage.className =
        "angela-message";


    angelaMessage.innerHTML =
        "<strong>ANGELA:</strong>" +
        "<p>" + response + "</p>";


    messageContainer.appendChild(angelaMessage);


    input.value = "";


    messageContainer.scrollTop =
        messageContainer.scrollHeight;

}


/* ------------------------------
   ANGELA RESPONSES
------------------------------ */

function getAngelaResponse(message) {

    const text =
        message.toLowerCase();


    if (text.includes("hello") ||
        text.includes("hi")) {

        return "Greetings, Manager. How may I assist you?";

    }


    if (text.includes("abnormality")) {

        return "The Abnormality Archive is available through the database section.";

    }


    if (text.includes("help")) {

        return "You may browse the Abnormality Archive or inspect an individual Abnormality record.";

    }


    if (text.includes("who are you")) {

        return "I am Angela, the facility's artificial intelligence system.";

    }


    if (text.includes("thank")) {

        return "You are welcome, Manager.";

    }


    return "I have recorded your inquiry. However, I do not currently have enough information to provide a response.";

}


/* ------------------------------
   ENTER KEY FOR ANGELA
------------------------------ */

function handleAngelaInput(event) {

    if (event.key === "Enter") {

        talkToAngela();

    }

}