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

// Timing constants for crash sequence (in milliseconds)
const TIMING = {
    INITIAL_VROOM: 100,
    START_MOVEMENT: 500,
    FIRST_CRASH: 2000,
    SPORT_CAR_SCREECH: 2800,
    SPORT_CAR_MOVEMENT: 3000,
    SECOND_CRASH: 4500,
    THIRD_SOUND: 5200,
    FINAL_CRASH: 5800,
    SEQUENCE_END: 7000
};

let isAnimating = false;
let activeTimeouts = [];

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
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('VROOM!');
    }, TIMING.INITIAL_VROOM));
    
    activeTimeouts.push(setTimeout(() => {
        carCarrier.classList.add('crash-left');
        tankTruck.classList.add('crash-right');
    }, TIMING.START_MOVEMENT));
    
    // First crash sound
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption(getRandomSound());
        showCrashEffect();
        carCarrier.classList.add('shake');
        tankTruck.classList.add('shake');
    }, TIMING.FIRST_CRASH));
    
    // Phase 2: Sport car joins the crash
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('SCREECH!');
    }, TIMING.SPORT_CAR_SCREECH));
    
    activeTimeouts.push(setTimeout(() => {
        sportCar.classList.add('crash-down');
    }, TIMING.SPORT_CAR_MOVEMENT));
    
    // Second crash sound
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption(getRandomSound());
        showCrashEffect();
        sportCar.classList.add('shake');
        carCarrier.classList.add('shake');
        tankTruck.classList.add('shake');
    }, TIMING.SECOND_CRASH));
    
    // Final impact sounds
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption(getRandomSound());
    }, TIMING.THIRD_SOUND));
    
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('CRASH!!!');
        showCrashEffect();
    }, TIMING.FINAL_CRASH));
    
    // End of sequence
    activeTimeouts.push(setTimeout(() => {
        isAnimating = false;
        startBtn.disabled = false;
        activeTimeouts = [];
    }, TIMING.SEQUENCE_END));
}

// Function to reset animation
function resetAnimation() {
    // Clear all active timeouts
    activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    activeTimeouts = [];
    
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
