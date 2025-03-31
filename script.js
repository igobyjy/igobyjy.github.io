// 粒子背景配置
particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    color: { value: '#8b4513' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  }
});

// 卡片动画延迟
document.querySelectorAll('.memory-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// 点击图片显示故事
document.querySelectorAll('.photo-frame').forEach(frame => {
  frame.addEventListener('click', function() {
    const story = this.parentNode.querySelector('.story');
    story.style.display = 'block';
  });
});

// 关闭故事弹窗
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.parentElement.style.display = 'none';
  });
});
