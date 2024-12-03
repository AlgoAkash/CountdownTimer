let targetDate;

// Load the target date from localStorage if it exists
function loadTargetDate() {
    const savedDate = localStorage.getItem("targetDate");
    if (savedDate) {
        targetDate = new Date(savedDate).getTime();
    } else {
        targetDate = new Date("December 31, 2024 23:59:59").getTime(); // Default date
    }
}

// Save the target date to localStorage
function saveTargetDate(date) {
    localStorage.setItem("targetDate", date);
}

// Update the countdown
function updateCountdown() {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the DOM
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

    // If the countdown is over, display "Expired"
    if (timeDifference < 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "<h2>Countdown Expired</h2>";
    }
}

// Handle user setting a new target date
document.getElementById("set-timer").addEventListener("click", () => {
    const userDate = document.getElementById("date-input").value;
    if (userDate) {
        targetDate = new Date(userDate).getTime();
        saveTargetDate(userDate); // Save to localStorage
        alert("Countdown updated!");
    } else {
        alert("Please enter a valid date and time.");
    }
});

// Load the target date and start the countdown
loadTargetDate();
const countdownInterval = setInterval(updateCountdown, 1000);
