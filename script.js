// Get elements
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const carCarrier = document.getElementById('car-carrier');
const tankTruck = document.getElementById('tank-truck');
const sportCar = document.getElementById('sport-car');
const train = document.getElementById('train');
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
    TRAIN_HORN: 5000,
    TRAIN_MOVEMENT: 5200,
    TRAIN_CRASH: 6500,
    THIRD_SOUND: 7200,
    FINAL_CRASH: 7800,
    SEQUENCE_END: 9000
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

// Function to create debris particles
function createDebris(x, y) {
    const debrisContainer = document.getElementById('debris-container');
    const debrisSymbols = ['🔩', '⚙️', '🔧', '💨', '✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
        const debris = document.createElement('div');
        debris.className = 'debris';
        debris.textContent = debrisSymbols[Math.floor(Math.random() * debrisSymbols.length)];
        debris.style.left = x + '%';
        debris.style.top = y + '%';
        debris.style.setProperty('--angle', Math.random() * 360 + 'deg');
        debris.style.setProperty('--distance', (50 + Math.random() * 100) + 'px');
        debrisContainer.appendChild(debris);
        
        setTimeout(() => debris.remove(), 2000);
    }
}

// Function to create smoke effect
function createSmoke(x, y) {
    const smokeContainer = document.getElementById('smoke-container');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.textContent = '💨';
            smoke.style.left = (x + (Math.random() - 0.5) * 10) + '%';
            smoke.style.top = y + '%';
            smokeContainer.appendChild(smoke);
            
            setTimeout(() => smoke.remove(), 2000);
        }, i * 200);
    }
}

// Function to damage vehicle
function damageVehicle(vehicle, severity = 'medium') {
    vehicle.classList.add('damaged');
    
    const cracks = vehicle.querySelectorAll('.crack');
    cracks.forEach(crack => crack.style.display = 'block');
    
    if (severity === 'heavy') {
        vehicle.classList.add('heavily-damaged');
    } else if (severity === 'severe') {
        vehicle.classList.add('severely-damaged');
    }
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
        
        // Damage vehicles and create effects
        damageVehicle(carCarrier);
        damageVehicle(tankTruck);
        createDebris(47, 25);
        createSmoke(47, 25);
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
        
        // Damage sport car and create more effects
        damageVehicle(sportCar, 'medium');
        sportCar.classList.add('crushed');
        createDebris(47, 40);
        createSmoke(47, 40);
    }, TIMING.SECOND_CRASH));
    
    // Phase 3: Train and sport car crash into each other
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('CHOO CHOO!');
        // Remove previous sport car animation
        sportCar.classList.remove('crash-down', 'crushed');
        // Start train and sport car moving toward each other
        train.classList.add('train-crash-left');
        sportCar.classList.add('sportcar-crash-right');
    }, TIMING.TRAIN_HORN));
    
    // Train and sport car collision
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('MEGA ' + getRandomSound());
        showCrashEffect();
        sportCar.classList.add('shake', 'train-impact');
        train.classList.add('shake');
        
        // Severe damage to both
        damageVehicle(sportCar, 'severe');
        damageVehicle(train, 'heavy');
        sportCar.classList.add('flattened', 'demolished');
        createDebris(55, 50);
        createDebris(50, 45);
        createSmoke(55, 45);
    }, TIMING.TRAIN_CRASH));
    
    // Final impact sounds
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption(getRandomSound());
    }, TIMING.THIRD_SOUND));
    
    activeTimeouts.push(setTimeout(() => {
        showSoundCaption('CRASH!!!');
        showCrashEffect();
        
        // Final impact - extra damage
        carCarrier.classList.add('tilted', 'broken');
        tankTruck.classList.add('tilted', 'broken');
        sportCar.classList.add('flattened');
        createDebris(47, 35);
        createSmoke(50, 30);
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
    carCarrier.classList.remove('crash-left', 'shake', 'damaged', 'squished', 'tilted', 'broken', 'heavily-damaged', 'severely-damaged');
    tankTruck.classList.remove('crash-right', 'shake', 'damaged', 'squished', 'tilted', 'broken', 'heavily-damaged', 'severely-damaged');
    sportCar.classList.remove('crash-down', 'sportcar-crash-right', 'shake', 'damaged', 'squished', 'crushed', 'flattened', 'train-impact', 'demolished', 'heavily-damaged', 'severely-damaged');
    train.classList.remove('train-incoming', 'train-crash-left', 'shake', 'damaged', 'heavily-damaged', 'severely-damaged');
    soundCaption.classList.remove('show');
    crashEffect.classList.remove('show');
    
    // Reset cracks
    [carCarrier, tankTruck, sportCar, train].forEach(vehicle => {
        const cracks = vehicle.querySelectorAll('.crack');
        cracks.forEach(crack => crack.style.display = 'none');
    });
    
    // Clear debris and smoke
    document.getElementById('debris-container').innerHTML = '';
    document.getElementById('smoke-container').innerHTML = '';
    
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
