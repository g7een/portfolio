const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const subjectCount = document.getElementById("subjectCount");
const messageCount = document.getElementById("messageCount");

function countWords(text) {
    const words = text.trim().match(/\S+/g);
    return words ? words.length : 0;
}

function updateCounter(input, display, limit) {
    let words = countWords(input.value);

    if (words > limit) {
        const trimmed = input.value
            .trim()
            .split(/\s+/)
            .slice(0, limit)
            .join(" ");

        input.value = trimmed;
        words = limit;
    }

    display.textContent = words;

    display.parentElement.classList.toggle(
        "limit",
        words >= limit
    );
}

subjectInput.addEventListener("input", () => {
    updateCounter(subjectInput, subjectCount, 15);
});

messageInput.addEventListener("input", () => {
    updateCounter(messageInput, messageCount, 150);
});

document.addEventListener("DOMContentLoaded", () => {

    const tabs = {
        about: document.querySelector(".about"),
        models: document.querySelector(".models"),
        projects: document.querySelector(".projects"),
        contact: document.querySelector(".contact")
    };

    const sections = {
        about: document.querySelector(".aboutsection"),
        models: document.querySelector(".viewmodels"),
        projects: document.querySelector(".viewprojects"),
        contact: document.querySelector(".contactform")
    };


    const SCROLL_OFFSET = 60;

    Object.keys(tabs).forEach(section => {
        tabs[section].addEventListener("click", () => {

            const y =
                sections[section].getBoundingClientRect().top +
                window.pageYOffset -
                SCROLL_OFFSET;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });

        });
    });

});

const darkButton = document.querySelector(".dark-mode-shift");
const icon = darkButton.querySelector("i");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon","fa-lightbulb");
}

darkButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        icon.classList.replace("fa-moon","fa-lightbulb");
        localStorage.setItem("theme","dark");
    }else{
        icon.classList.replace("fa-lightbulb","fa-moon");
        localStorage.setItem("theme","light");
    }

});