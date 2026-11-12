const lines = ["Hmm, ein neuer Leser in dieser bescheidenen Bibliothek?",
    "Nun gut, bevor Sie in die Welt der Bücher eintauchen, möchte ich Ihnen noch eine Regel erklären.",
    "In dieser Bibliothek sucht sich das Buch seinen Leser aus. Deshalb können Sie nicht alle Bücher lesen.",
    "Was glauben Sie, welches davon möchte heute gelesen werden?"
];
const voice = document.getElementById("voice");
const intro = document.getElementById("intro");
const fadeTime = 1000;
const skip = document.getElementById("ueberspringen");
const openTime = 1700;
const bookMain = document.getElementById("book-main");
const openButton = document.getElementById("button-oeffnen");
let opening = false;
const bookmarks = document.querySelectorAll(".bookmark");
const chapters = document.querySelectorAll(".chapter");


//ScreenChange
function showScreen(id) {
    const current = document.querySelector(".displaying.active");
    const next = document.getElementById(id);

    function enter() {
        next.classList.add("active");
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                next.classList.add("shown");
            });
        });
    }

    if (current) {
        current.classList.remove("shown");
        setTimeout(function() {
            current.classList.remove("active");
            enter();
        }, 500);
    } else {
        enter();
    }
}

//LoadingScreen
setTimeout(function () {
    showScreen("intro");
    voiceTalking();
}, 5500);

//Intro
function voiceTalking() {
    let current = 0;
    let busy = false;

    function nextLine() {
        busy = true;
        fadeOut(voice);
        setTimeout(function () {
            voice.textContent = lines[current];
            fadeIn(voice);
            setTimeout(function () {
                busy = false;
            }, fadeTime);
        }, fadeTime);
    } 

    intro.addEventListener("click", function() {
        if (busy) {
            return;
        }

        current++;

        if (current === lines.length) {
            showScreen("book-select");
            return;
        }

        nextLine();
    });

    nextLine();


}

function fadeIn(element) {
    element.classList.add("visible");
}

function fadeOut(element) {
    element.classList.remove("visible");
}

//Intro-Überspringen
skip.addEventListener("click", function (event) {
    event.stopPropagation();
    showScreen("book-select");
});

//Book-select
document.querySelector(".books").addEventListener("click", function(event) {
    const book = event.target.closest(".book");
    if (book === null) {
        return;
    }
    if (book.dataset.book === "portfolio") {
        document.querySelectorAll(".book:not([data-book='portfolio'])").forEach(function(otherBook) {
            otherBook.classList.add("fade-out");
        });
        setTimeout(function () {
            showScreen("book-main");
        }, 600)
    } else {
        book.classList.add("fade-out");
    }
});

//Animation-opening
openButton.addEventListener("click", function() {
    if (opening) {
        return;
    }
    opening = true;

    bookMain.classList.add("opening");

    setTimeout(function () {
        bookMain.classList.add("zooming");
        showScreen("book-opened");
    }, openTime);
});

//Opened-book
function showChapter(id) {
    chapters.forEach(function (chapter) {
        chapter.classList.toggle("active", chapter.id === id);
    });
    bookmarks.forEach(function (bookmark) {
        bookmark.classList.toggle("active", bookmark.dataset.chapter === id);
    });
}

bookmarks.forEach(function (bookmark) {
    bookmark.addEventListener("click", function () {
        showChapter(bookmark.dataset.chapter);
    });
});