document.getElementById('main-ball').addEventListener('click', function(e) {
    const ball = e.target;
    const container = document.getElementById('game-container');
    const rect = ball.getBoundingClientRect();
    
    // Calculate center relative to the viewport
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Hide the main ball
    ball.style.opacity = '0';
    ball.style.pointerEvents = 'none';

    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle(centerX, centerY, container);
    }

    // Reset after 2 seconds
    setTimeout(() => {
        ball.style.opacity = '1';
        ball.style.pointerEvents = 'auto';
    }, 2000);
});

function createParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 12 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Initial position (using fixed positioning coordinates)
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;
    
    container.appendChild(particle);

    // Random velocity and direction
    const angle = Math.random() * Math.PI * 2;
    const force = Math.random() * 12 + 4;
    const vx = Math.cos(angle) * force;
    const vy = Math.sin(angle) * force;
    
    let posX = x - size / 2;
    let posY = y - size / 2;
    let opacity = 1;
    let gravity = 0.25;
    let currentVy = vy;
    let currentVx = vx;

    function animate() {
        posX += currentVx;
        currentVy += gravity;
        posY += currentVy;
        opacity -= 0.015;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${opacity})`;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    requestAnimationFrame(animate);
}