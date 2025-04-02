// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the header element
    const header = document.querySelector('h1');
    
    // Add a click event listener to the header
    header.addEventListener('click', function() {
        // Change the header text color randomly when clicked
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        header.style.color = randomColor;
    });

    // Get the button element
    const button = document.getElementById('myButton');
    
    // Timer variables
    let seconds = 0;
    let centiseconds = 0;
    let timerInterval;
    let isTimerRunning = true;

    // Create and add timer display
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.style.textAlign = 'center';
    timerDisplay.style.fontSize = '24px';
    timerDisplay.style.margin = '20px';
    timerDisplay.style.color = 'var(--primary-color)';
    timerDisplay.style.fontWeight = 'bold';
    timerDisplay.style.fontFamily = 'monospace';
    document.querySelector('section').insertBefore(timerDisplay, button);

    // Create and add best record display
    const bestRecordDisplay = document.createElement('div');
    bestRecordDisplay.id = 'bestRecord';
    bestRecordDisplay.style.textAlign = 'center';
    bestRecordDisplay.style.fontSize = '18px';
    bestRecordDisplay.style.margin = '10px';
    bestRecordDisplay.style.color = 'var(--secondary-color)';
    bestRecordDisplay.style.fontWeight = 'bold';
    document.querySelector('section').insertBefore(bestRecordDisplay, timerDisplay);

    // Function to update timer display
    function updateTimer() {
        // Format centiseconds to always show 2 digits
        const formattedCentiseconds = centiseconds.toString().padStart(2, '0');
        timerDisplay.textContent = `${seconds}.${formattedCentiseconds}`;
    }

    // Function to update best record display
    function updateBestRecordDisplay() {
        const bestRecord = localStorage.getItem('bestRecord');
        if (bestRecord) {
            bestRecordDisplay.textContent = `Best Record: ${parseFloat(bestRecord).toFixed(2)} seconds`;
            bestRecordDisplay.style.color = 'var(--secondary-color)';
        } else {
            bestRecordDisplay.textContent = 'Best Record: No record yet';
            bestRecordDisplay.style.color = 'var(--secondary-color)';
        }
    }

    // Update best record display initially
    updateBestRecordDisplay();

    // Start the timer
    timerInterval = setInterval(() => {
        if (isTimerRunning) {
            centiseconds++;
            if (centiseconds >= 100) {
                seconds++;
                centiseconds = 0;
            }
            updateTimer();
        }
    }, 10); // Update every 10 milliseconds (1 centisecond)
    
    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Stop the timer
        isTimerRunning = false;
        clearInterval(timerInterval);
        
        // Calculate final time
        const finalTime = seconds + (centiseconds / 100);
        
        // Check and update best record
        const bestRecord = localStorage.getItem('bestRecord');
        const isNewRecord = !bestRecord || finalTime < parseFloat(bestRecord);
        
        if (isNewRecord) {
            localStorage.setItem('bestRecord', finalTime);
            bestRecordDisplay.textContent = `New Best Record: ${finalTime.toFixed(2)} seconds! 🎉`;
            bestRecordDisplay.style.color = '#ffd700'; // Gold color for new record
            bestRecordDisplay.style.fontSize = '24px';
            bestRecordDisplay.style.transition = 'all 0.3s ease';
        }
        
        // Change the button text and style when clicked
        button.textContent = isNewRecord ? 'New Record! 🎉' : 'Timer Stopped!';
        button.style.backgroundColor = isNewRecord ? '#ffd700' : 'var(--accent-color)';
        
        // Store the final time in localStorage
        localStorage.setItem('finalTime', finalTime);
        
        // Navigate to result.html after a short delay
        setTimeout(() => {
            window.location.href = 'result.html';
        }, 1500); // Increased delay to show the new record celebration
    });
}); 