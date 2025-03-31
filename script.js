// 视差动画引擎
class ParallaxEngine {
  constructor() {
    this.items = document.querySelectorAll('.parallax-item');
    this.init();
  }

  init() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleMouseMove(e) {
    this.items.forEach(item => {
      const speed = parseFloat(item.dataset.speed) || 0.02;
      const x = (window.innerWidth - e.clientX * speed);
      const y = (window.innerHeight - e.clientY * speed);
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  handleResize() {
    this.items.forEach(item => item.style.transform = 'translate(0,0)');
  }
}

// 滚动动画控制器
class ScrollAnimator {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      threshold: 0.1
    });
    this.init();
  }

  init() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      this.observer.observe(el);
    });
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }
}

// 光标系统
class CursorSystem {
  constructor() {
    this.cursor = document.createElement('div');
    this.init();
  }

  init() {
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('mousemove', this.trackCursor.bind(this));
    document.addEventListener('mousedown', () => this.cursor.classList.add('active'));
    document.addEventListener('mouseup', () => this.cursor.classList.remove('active'));
  }

  trackCursor(e) {
    this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
}

// 初始化所有模块
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxEngine();
  new ScrollAnimator();
  new CursorSystem();
});

// 图片懒加载
if('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}
