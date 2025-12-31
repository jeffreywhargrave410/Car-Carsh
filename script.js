// Get elements
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const carCarrier = document.getElementById('car-carrier');
const tankTruck = document.getElementById('tank-truck');
const sportCar = document.getElementById('sport-car');
const soundCaption = document.getElementById('sound-caption');
const crashEffect = document.getElementById('crash-effect');

// Sound effects array
const soundEffects = [
    'CRASH!',
    'BOOM!',
    'BANG!',
    'SMASH!',
    'KABOOM!',
    'WHAM!',
    'POW!'
];

let isAnimating = false;

// Function to show sound caption
function showSoundCaption(sound) {
    soundCaption.textContent = sound;
    soundCaption.classList.add('show');
    
    setTimeout(() => {
        soundCaption.classList.remove('show');
    }, 800);
}

// Function to show crash effect
function showCrashEffect() {
    crashEffect.textContent = '💥';
    crashEffect.classList.add('show');
    
    setTimeout(() => {
        crashEffect.classList.remove('show');
    }, 1000);
}

// Function to get random sound effect
function getRandomSound() {
    return soundEffects[Math.floor(Math.random() * soundEffects.length)];
}

// Function to start crash sequence
function startCrashSequence() {
    if (isAnimating) return;
    
    isAnimating = true;
    startBtn.disabled = true;
    
    // Phase 1: Car carrier and tank truck crash into each other
    setTimeout(() => {
        showSoundCaption('VROOM!');
    }, 100);
    
    setTimeout(() => {
        carCarrier.classList.add('crash-left');
        tankTruck.classList.add('crash-right');
    }, 500);
    
    // First crash sound
    setTimeout(() => {
        showSoundCaption(getRandomSound());
        showCrashEffect();
        carCarrier.classList.add('shake');
        tankTruck.classList.add('shake');
    }, 2000);
    
    // Phase 2: Sport car joins the crash
    setTimeout(() => {
        showSoundCaption('SCREECH!');
    }, 2800);
    
    setTimeout(() => {
        sportCar.classList.add('crash-down');
    }, 3000);
    
    // Second crash sound
    setTimeout(() => {
        showSoundCaption(getRandomSound());
        showCrashEffect();
        sportCar.classList.add('shake');
        carCarrier.classList.add('shake');
        tankTruck.classList.add('shake');
    }, 4500);
    
    // Final impact sounds
    setTimeout(() => {
        showSoundCaption(getRandomSound());
    }, 5200);
    
    setTimeout(() => {
        showSoundCaption('CRASH!!!');
        showCrashEffect();
    }, 5800);
    
    // End of sequence
    setTimeout(() => {
        isAnimating = false;
        startBtn.disabled = false;
    }, 7000);
}

// Function to reset animation
function resetAnimation() {
    // Remove all animation classes
    carCarrier.classList.remove('crash-left', 'shake');
    tankTruck.classList.remove('crash-right', 'shake');
    sportCar.classList.remove('crash-down', 'shake');
    soundCaption.classList.remove('show');
    crashEffect.classList.remove('show');
    
    // Clear caption text
    soundCaption.textContent = '';
    crashEffect.textContent = '';
    
    isAnimating = false;
    startBtn.disabled = false;
}

// Event listeners
startBtn.addEventListener('click', startCrashSequence);
resetBtn.addEventListener('click', resetAnimation);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isAnimating) {
            startCrashSequence();
        }
    } else if (e.key === 'r' || e.key === 'R') {
        resetAnimation();
    }
});

// Welcome message
console.log('🚛 Truck Crash Simulator Ready! 🚚');
console.log('Press the "Start Crash Sequence" button or press Space/Enter to begin!');
console.log('Press "R" to reset the simulation.');
