/* ================= Yes/No Button Effects ================= */
const noButton = document.querySelector(".no");
const yesButton = document.querySelector(".yes");
const yesContainer = document.querySelector(".button-container:first-child");
const btns = document.querySelector(".btns");
const form = document.getElementById("valentine-form");
const usernameInput = document.getElementById("username");

// No button texts for fun
const noTexts = [
  "Are you sure?", "Really sure?", "Are you positive?",
  "Pookie please...", "Just think about it...",
  "If you say no, I will be really sad...",
  "I will be very sad...", "I will be very very sad..."
];

let noClickCount = 0;
let yesScale = 1.5;

// Fun "No" button logic
noButton.addEventListener("click", () => {
  noClickCount = (noClickCount + 1) % noTexts.length;
  noButton.textContent = noTexts[noClickCount];

  yesScale += 2;
  yesContainer.style.width = `${100 + (yesScale - 1) * 20}px`;
  yesButton.style.width = "90%";
  yesButton.style.height = "100%";
  yesButton.style.fontSize = `${1 + (yesScale - 1) * 0.2}rem`;
  btns.style.height = `${50 + (yesScale - 1) * 20}px`;

  if (yesScale > 20) {
    yesButton.style.position = "fixed";
    yesButton.style.top = "0";
    yesButton.style.left = "0";
    yesButton.style.width = "100vw";
    yesButton.style.height = "100vh";
    yesButton.style.zIndex = "10";
    yesButton.style.fontSize = "5rem";
  }
});


/* ================= Yes Button Click (Redirect) ================= */
form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop default form submission

  const username = usernameInput.value.trim();
  if (!username) {
    alert("💌 Please enter your name before clicking Yes!");
    usernameInput.focus();
    return;
  }

  // Send form via fetch to Formspree
  const data = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      // Redirect after notification sent
      window.location.href = "yes.html";
    } else {
      alert("Oops! Something went wrong. Try again later.");
    }
  })
  .catch(err => {
    console.error("Error sending form:", err);
    alert("Oops! Something went wrong. Try again later.");
  });
});

/* ================= Music Auto Play & Fade ================= */
const music = document.getElementById("bg-music");
music.play().catch(() => {});

let vol = 0;
const fade = setInterval(() => {
  vol += 0.02;
  music.volume = Math.min(vol, 1);
  if (vol >= 1) clearInterval(fade);
}, 100);

const savedTime = localStorage.getItem("musicTime");
if (savedTime) music.currentTime = parseFloat(savedTime);

const startMusic = () => {
  music.play().catch(err => console.log("Music cannot autoplay yet:", err));
};
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

setInterval(() => {
  if (!music.paused) localStorage.setItem("musicTime", music.currentTime);
}, 500);
