// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mega Text Animation
const megaText = document.querySelector('.mega-text');
const words = megaText.innerHTML.split('<br>');
megaText.innerHTML = '';

words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'block';
    megaText.appendChild(span);

    gsap.from(span, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power4.out'
    });
});

// Sub Text Animation
const subText = document.querySelector('.sub-text');
const subLines = subText.innerHTML.split('<br>');
subText.innerHTML = '';

subLines.forEach((line, index) => {
    const span = document.createElement('span');
    span.textContent = line;
    span.style.display = 'block';
    subText.appendChild(span);

    gsap.from(span, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8 + (index * 0.2), // mega-text 애니메이션 이후 시작
        ease: 'power4.out'
    });
});

// Overlay Text Animation
const overlayTexts = document.querySelectorAll('.overlay-text span');
overlayTexts.forEach((text, index) => {
    gsap.from(text, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 1 + (index * 0.2),
        ease: 'power2.out'
    });
});

// Phone Frame Animation
gsap.from('.phone-frame', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out'
});

// Project Cards Animation
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = 
            document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.querySelector('.theme-icon').textContent = 
            document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .project-section').forEach(el => {
    observer.observe(el);
});

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax-image');

const handleParallax = () => {
    parallaxElements.forEach(el => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        el.style.transform = `translateY(${rate}px)`;
    });
};

// Event Listeners
window.addEventListener('scroll', () => {
    handleParallax();
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const stickyNav = document.querySelector('.sticky-nav');

if (hamburger && stickyNav) {
    hamburger.addEventListener('click', () => {
        stickyNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Results Slider Initialization
const resultsSlider = document.querySelector('.results-slider');
if (resultsSlider) {
    new Swiper('.results-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                const slides = document.querySelectorAll('.swiper-slide');
                const imgSrc = slides[index].querySelector('img').src;
                return `<span class="${className}" style="background-image: url(${imgSrc})"></span>`;
            },
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// 전역 변수로 캐러셀의 현재 상태를 저장
let currentSlide = 0;

// 문서가 로드되었을 때 실행되는 함수
window.onload = function() {
    console.log("문서 로드됨 - 캐러셀 초기화 시작");
    
    // 직접 DOM 요소 가져오기
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const indicators = document.querySelectorAll('.indicator');
    
    // 요소들이 제대로 선택되었는지 확인
    console.log("캐러셀 요소 확인:", {
        "트랙 존재": !!track,
        "슬라이드 수": slides.length,
        "이전 버튼 존재": !!prevBtn,
        "다음 버튼 존재": !!nextBtn,
        "인디케이터 수": indicators.length
    });
    
    // 슬라이드가 없으면 실행 중단
    if (!track || slides.length === 0) {
        console.error("캐러셀을 초기화할 수 없습니다: 필수 요소가 없습니다");
        return;
    }
    
    // 슬라이드 이동 함수
    function goToSlide(index) {
        // 유효한 인덱스로 조정
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // 현재 슬라이드 저장
        currentSlide = index;
        console.log(`슬라이드 ${index+1}(으)로 이동`);
        
        // 트랙 이동
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // 인디케이터 업데이트
        for (let i = 0; i < indicators.length; i++) {
            if (i === index) {
                indicators[i].classList.add('active');
            } else {
                indicators[i].classList.remove('active');
            }
        }
    }
    
    // 이전 버튼 클릭 이벤트
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            console.log("이전 버튼 클릭됨");
            goToSlide(currentSlide - 1);
        };
    }
    
    // 다음 버튼 클릭 이벤트
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            console.log("다음 버튼 클릭됨");
            goToSlide(currentSlide + 1);
        };
    }
    
    // 인디케이터 클릭 이벤트
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].onclick = function(e) {
            e.preventDefault();
            console.log(`인디케이터 ${i+1} 클릭됨`);
            goToSlide(i);
        };
    }
    
    // 초기 슬라이드 설정
    goToSlide(0);
    console.log("캐러셀 초기화 완료");
}; 