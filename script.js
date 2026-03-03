// --- Interactive Particle Background ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Create particle object
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Controls dot size
        this.speedX = Math.random() * 0.5 - 0.25; // Controls speed
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    // Move particles
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges of the screen
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    // Draw particles
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Populate the screen with particles
function init() {
    particlesArray = [];
    // Amount of particles based on screen size
    let numberOfParticles = (canvas.height * canvas.width) / 9000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// --- Copy Email Feature ---
const copyEmailBtn = document.getElementById('copyEmailBtn');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = 'halilogluug05@gmail.com';
        
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyEmailBtn.textContent;
            copyEmailBtn.textContent = '✅ Copied!';
            
            setTimeout(() => {
                copyEmailBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });
}