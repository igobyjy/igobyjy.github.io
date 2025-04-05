// app.js
class Gallery {
    constructor() {
        this.gallery = document.getElementById('gallery');
        this.loadMoreBtn = document.getElementById('loadMore');
        this.loadingBar = document.getElementById('loadingBar');
        this.lightbox = null;
        this.currentIndex = 0;
        this.images = [];
        this.page = 1;
        this.init();
    }

    async init() {
        this.createLightbox();
        await this.loadImages();
        this.initObservers();
        this.addEventListeners();
    }

    async loadImages() {
        this.showLoading();
        // 模拟API请求，实际应替换为真实API地址
        const newImages = await this.fetchImages(this.page);
        this.images = [...this.images, ...newImages];
        this.renderGallery();
        this.page++;
        this.hideLoading();
    }

    async fetchImages(page) {
        // 模拟异步获取图片数据
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.generateImageData(page));
            }, 1000);
        });
    }

    generateImageData(page) {
        // 生成示例图片数据
        return Array.from({ length: 6 }, (_, i) => ({
            id: page * 10 + i,
            url: `https://picsum.photos/seed/buzz${page * 10 + i}/600/400`,
            title: `星际影像 #${page * 10 + i + 1}`,
            desc: `巴斯光年太空任务记录 - 第${page * 10 + i + 1}号影像`
        }));
    }

    renderGallery() {
        const fragment = document.createDocumentFragment();
        this.images.forEach((img, index) => {
            const item = this.createGalleryItem(img, index);
            fragment.appendChild(item);
        });
        this.gallery.appendChild(fragment);
    }

    createGalleryItem(img, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img data-src="${img.url}" alt="${img.desc}" class="gallery-img">
            <div class="image-title">${img.title}</div>
        `;
        item.addEventListener('click', () => this.openLightbox(index));
        return item;
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-img">
                <div class="lightbox-close">✕</div>
                <div class="nav-buttons">
                    <button class="nav-button prev">←</button>
                    <button class="nav-button next">→</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.lightbox);
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.lightbox.classList.add('active');
        this.updateLightboxImage();
        this.addLightboxEventListeners();
    }

    updateLightboxImage() {
        const img = this.lightbox.querySelector('.lightbox-img');
        img.src = this.images[this.currentIndex].url;
        img.alt = this.images[this.currentIndex].desc;
    }

    addLightboxEventListeners() {
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        const prevBtn = this.lightbox.querySelector('.prev');
        const nextBtn = this.lightbox.querySelector('.next');
        
        const closeHandler = () => this.closeLightbox();
        const prevHandler = () => this.navigate(-1);
        const nextHandler = () => this.navigate(1);
        
        closeBtn.addEventListener('click', closeHandler);
        prevBtn.addEventListener('click', prevHandler);
        nextBtn.addEventListener('click', nextHandler);
        
        // 触摸滑动支持
        let touchStartX = 0;
        this.lightbox.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.lightbox.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.navigate(1) : this.navigate(-1);
            }
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
    }

    initObservers() {
        // 图片懒加载
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    lazyLoadObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-img').forEach(img => {
            lazyLoadObserver.observe(img);
        });

        // 加载更多按钮观察
        const loadMoreObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMoreBtn.style.opacity = '1';
                    this.loadMoreBtn.style.transform = 'translateY(0)';
                }
            });
        });

        loadMoreObserver.observe(this.loadMoreBtn);
    }

    addEventListeners() {
        document.querySelector('.load-btn').addEventListener('click', () => this.loadImages());
    }

    showLoading() {
        this.loadingBar.style.width = '100%';
    }

    hideLoading() {
        this.loadingBar.style.width = '0';
        this.loadingBar.style.transition = 'width 0.3s ease';
    }
}

// 初始化
new Gallery();

// 动态星星背景（保持原有功能）
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1 + 's';
        starsContainer.appendChild(star);
    }
}
createStars();
