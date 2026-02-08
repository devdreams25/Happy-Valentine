const noButton = document.querySelector(".no");
const yesButton = document.querySelector(".yes");
const yesContainer = document.querySelector(".button-container:first-child");
const btns = document.querySelector(".btns");
const noTexts = [
  "Are you sure?",
  "Really sure?",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very sad...",
];
let noClickCount = 0;
let yesScale = 1;
let cycleCount = 0;

noButton.addEventListener("click", () => {
  noClickCount = (noClickCount + 1) % noTexts.length;
  noButton.textContent = noTexts[noClickCount];
  if (noClickCount === 0) cycleCount++;
  yesScale += 1;
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

yesButton.addEventListener("click", () => {
  window.location.href = "yes.html";
});

/* Message notif */
// Initialize EmailJS (replace with your EmailJS user ID)
emailjs.init("service_2v0nr9l"); // Get this from EmailJS dashboard

// Select the Yes and No buttons
const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');

// Get the username input
const usernameInput = document.getElementById('username');

// When user clicks Yes
yesBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();

  // Check if name is empty
  if (!username) {
    alert("Please enter your name before clicking Yes 💌");
    usernameInput.focus();
    return; // Stop further execution
  }

  // Send email via EmailJS
  emailjs.send("service_2v0nr9l", "service_2v0nr9l", {
    from_name: username,
    message: `${username} clicked YES on your Valentine page! 💖`
  })
  .then(() => {
    alert(`Thanks ${username}! Your Yes has been sent 💌`);
    // Optional: Disable Yes button after success
    yesBtn.disabled = true;
    yesBtn.textContent = "💖 Sent!";
    yesBtn.style.backgroundColor = "#E91E63";
  })
  .catch(err => {
    console.error("Failed to send notification:", err);
    alert("Oops! Something went wrong. Try again later.");
  });
});

// Optional: When user clicks No
noBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim() || "Anonymous";
  alert(`Oh no 😢 Maybe next time, ${username}...`);
});


/* Music auto play*/
const music = document.getElementById("bg-music");
music.play(); // safe to call
let vol = 0;
const fade = setInterval(() => {
  vol += 0.02;
  music.volume = Math.min(vol, 1);
  if (vol >= 1) clearInterval(fade);
}, 100);

// restore previous play time
const savedTime = localStorage.getItem("musicTime");
if (savedTime) music.currentTime = parseFloat(savedTime);

// play after first user interaction (click or tap)
const startMusic = () => {
  music.play().catch(err => {
    console.log("Music cannot autoplay yet:", err);
  });
};
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// save current time continuously so next page resumes
setInterval(() => {
  if (!music.paused) localStorage.setItem("musicTime", music.currentTime);
}, 500);

