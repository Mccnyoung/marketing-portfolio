// 프로젝트 캐러셀 초기화 함수
function initProjectCarousel() {
    // 캐러셀 요소 가져오기
    const carousel = document.getElementById('projectCarousel');
    
    // 캐러셀이 존재하지 않으면 함수 종료
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    // 슬라이드가 없으면 함수 종료
    if (!track || slides.length === 0) return;
    
    // 현재 슬라이드 인덱스
    let currentSlide = 0;
    
    // 특정 슬라이드로 이동하는 함수
    function goToSlide(index) {
        // 인덱스 범위 처리
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // 현재 슬라이드 인덱스 업데이트
        currentSlide = index;
        
        // 트랙 이동
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // 인디케이터 업데이트
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    // 이전 버튼 클릭 이벤트
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
    }
    
    // 다음 버튼 클릭 이벤트
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
    }
    
    // 인디케이터 클릭 이벤트
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // 캐러셀 첫 슬라이드로 초기화
    goToSlide(0);
    
    // 라이트박스 기능 초기화
    initLightbox(slides);
}

// 라이트박스 초기화 함수
function initLightbox(slides) {
    // 라이트박스 요소 가져오기
    const modal = document.getElementById('lightboxModal');
    if (!modal) return; // 모달이 없으면 종료
    
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('closeLightbox');
    
    // 각 슬라이드에 클릭 이벤트 추가
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const img = slide.querySelector('img');
            if (img) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            }
        });
    });
    
    // 닫기 버튼 클릭 이벤트
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // 확대된 이미지 클릭 시 닫기
    if (lightboxImage) {
        lightboxImage.addEventListener('click', function(e) {
            e.stopPropagation(); // 이벤트 전파 중지
            closeLightbox();
        });
    }
    
    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    // ESC 키 누를 때 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // 라이트박스 닫기 함수
    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

// DOM이 로드된 후 캐러셀 초기화
document.addEventListener('DOMContentLoaded', function() {
    initProjectCarousel();
}); 