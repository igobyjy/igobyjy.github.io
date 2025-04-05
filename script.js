// app.js
class CyberGallery {
    constructor() {
        this.grid = document.getElementById('grid');
        this.terminal = document.getElementById('terminal');
        this.hoverSound = document.getElementById('hoverSound');
        this.initParticles();
        this.initGallery();
        this.initTerminal();
        this.addEventListeners();
    }

    initParticles() {
        // 使用Three.js创建粒子场
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: document.querySelector('#particleCanvas'),
            alpha: true 
        });

        const particles = new THREE.BufferGeometry();
        const positions = [];
        for(let i = 0; i < 5000; i++) {
            positions.push(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
        }
        particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x00ff9d,
            transparent: true,
            opacity: 0.5
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        camera.position.z = 5;

        // 动画循环
        function animate() {
            requestAnimationFrame(animate);
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    }

    initGallery() {
        // 动态生成图片项
        const images = Array.from({length: 12}, (_, i) => ({
            id: i,
            url: `https://picsum.photos/seed/buzz${i}/600/400`,
            title: `HYPERSPACE_${i.toString(16).toUpperCase()}`
        }));

        images.forEach((img, i) => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.innerHTML = `
                <img src="${img.url}" class="hologram-img">
                <div class="data-overlay">${img.title}</div>
            `;
            
            // GSAP动画
            gsap.from(item, {
                duration: 1,
                opacity: 0,
                y: 100,
                rotationX: 180,
                delay: i * 0.1
            });

            this.grid.appendChild(item);
        });
    }

    initTerminal() {
        const commands = [
            'INITIALIZING HOLOGRAM SYSTEM...',
            'LOADING SPACE-TIME COORDINATES...',
            'CONNECTING TO STAR COMMAND...',
            'WARP DRIVE READY...'
        ];

        let index = 0;
        setInterval(() => {
            this.terminal.innerHTML += `> ${commands[index]}<br>`;
            this.terminal.scrollTop = this.terminal.scrollHeight;
            index = (index + 1) % commands.length;
        }, 2000);
    }

    addEventListeners() {
        // 3D悬停效果
        document.querySelectorAll('.grid-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateY = (x - rect.width/2) / 10;
                const rotateX = -(y - rect.height/2) / 10;
                
                gsap.to(item, {
                    duration: 0.5,
                    rotationY: rotateY,
                    rotationX: rotateX,
                    ease: "power2.out"
                });

                this.hoverSound.play();
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 1,
                    rotationY: 0,
                    rotationX: 0,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // 响应式调整
        window.addEventListener('resize', () => {
            gsap.set('.grid-container', {perspective: window.innerWidth / 2});
        });
    }
}

// 初始化
new CyberGallery();
