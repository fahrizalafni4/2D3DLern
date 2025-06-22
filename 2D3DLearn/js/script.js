/* ===========================================
   ANIMEEDU - JAVASCRIPT
   Website Pembelajaran Animasi 2D & 3D
   =========================================== */

// ===========================================
// NAVIGATION & MOBILE MENU
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling untuk navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlight
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize quiz
    initializeQuiz();
});

// ===========================================
// QUIZ FUNCTIONALITY
// ===========================================

// Data soal kuis
const quizData = [
    {
        question: "Apa fungsi storyboard dalam animasi?",
        answers: [
            "Untuk menggambar karakter",
            "Untuk menyimpan file animasi", 
            "Untuk merancang alur cerita visual",
            "Untuk merekam suara"
        ],
        correct: 2
    },
    {
        question: "Software mana yang merupakan open-source untuk animasi 2D?",
        answers: [
            "Adobe Animate",
            "Toon Boom Harmony",
            "Synfig Studio",
            "After Effects"
        ],
        correct: 2
    },
    {
        question: "Tahapan produksi animasi 3D yang meliputi pemberian tekstur adalah:",
        answers: [
            "Modeling",
            "Rigging", 
            "Texturing & Shading",
            "Rendering"
        ],
        correct: 2
    },
    {
        question: "Apa perbedaan utama antara animasi 2D dan 3D?",
        answers: [
            "Animasi 2D lebih sulit dibuat",
            "Animasi 3D menggunakan sumbu Z (kedalaman)",
            "Animasi 2D tidak memerlukan software",
            "Animasi 3D hanya untuk game"
        ],
        correct: 1
    },
    {
        question: "Proses rigging dalam animasi 3D berfungsi untuk:",
        answers: [
            "Membuat model 3D",
            "Memberikan kerangka tulang untuk animasi",
            "Rendering final",
            "Menambah efek lighting"
        ],
        correct: 1
    },
    {
        question: "Pencil2D adalah software untuk?",
        answers: [
            "Animasi 3D profesional",
            "Editing video",
            "Animasi 2D tradisional",
            "Modeling karakter"
        ],
        correct: 2
    },
    {
        question: "Software berikut yang digunakan untuk membuat animasi 3D adalah?",
        answers: [
            "Adobe Illustrator",
            "Toon Boom Harmony",
            "Blender",
            "MediBang Paint"
        ],
        correct: 2
    },
    {
        question: "Teknik frame-by-frame lebih sering digunakan dalam?",
        answers: [
            "Animasi 3D",
            "Animasi stop motion",
            "Animasi 2D tradisional",
            "Motion capture"
        ],
        correct: 2
    },
    {
        question: "Dalam animasi 3D, lighting digunakan untuk?",
        answers: [
            "Mengatur suara karakter",
            "Mengontrol pencahayaan dan suasana",
            "Mengedit suara latar",
            "Mewarnai objek"
        ],
        correct: 1
    },
    {
        question: "Format file umum untuk menyimpan animasi adalah?",
        answers: [
            ".mp3",
            ".jpg",
            ".mp4",
            ".docx"
        ],
        correct: 2
    }
];


// Variabel quiz
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Inisialisasi quiz
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    showQuestion();
}

// Menampilkan soal
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    // Pastikan question container ditampilkan
    questionContainer.style.display = 'block';
    resultContainer.classList.add('result-hidden');
    
    // Update nomor soal
    document.getElementById('question-number').textContent = 
        `Soal ${currentQuestion + 1} dari ${quizData.length}`;
    
    // Update pertanyaan
    document.getElementById('question-text').textContent = 
        quizData[currentQuestion].question;
    
    // Update pilihan jawaban
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    quizData[currentQuestion].answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = `${String.fromCharCode(97 + index)}. ${answer}`;
        answerElement.onclick = () => selectAnswer(index, answerElement);
        answersContainer.appendChild(answerElement);
    });
    
    // Reset button state
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = true;
    nextButton.textContent = 'Selanjutnya';
    selectedAnswer = null;
}

// Memilih jawaban
function selectAnswer(answerIndex, element) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked element
    element.classList.add('selected');
    selectedAnswer = answerIndex;
    
    // Enable next button
    document.getElementById('next-button').disabled = false;
}

// Fungsi untuk soal selanjutnya
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Cek jawaban
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    
    // Cek apakah sudah soal terakhir
    if (currentQuestion >= quizData.length) {
        showResult();
    } else {
        showQuestion();
    }
}

// Menampilkan hasil
function showResult() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');

    // Sembunyikan question container dan tampilkan result
    questionContainer.style.display = 'none';
    resultContainer.classList.remove('result-hidden');

    // Update skor
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-score').textContent = quizData.length; // ⬅️ Tambahkan baris ini

    // Evaluasi berdasarkan skor
    let evaluation = '';
    if (score === 10) {
        evaluation = "🎉 Sempurna! Kamu benar-benar menguasai materi animasi!";
    } else if (score >= 8) {
        evaluation = "🌟 Hebat! Kamu sudah memahami sebagian besar materi dengan baik!";
    } else if (score >= 6) {
        evaluation = "👍 Bagus! Tapi masih ada beberapa materi yang perlu dipelajari lagi.";
    } else if (score >= 4) {
        evaluation = "📚 Cukup baik, tapi sebaiknya pelajari materi sekali lagi ya!";
    } else {
        evaluation = "💪 Jangan menyerah! Baca materi sekali lagi dan coba kuis ulang!";
    }

    document.getElementById('evaluation-text').textContent = evaluation;
}


// Restart quiz
function restartQuiz() {
    initializeQuiz();
}

// ===========================================
// SMOOTH SCROLLING FUNCTIONS
// ===========================================

// Fungsi scroll ke section tertentu
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

// Observer untuk animasi scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements untuk animasi
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.materi-card, .download-card, .profil-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================================
// DOWNLOAD FUNCTIONALITY
// ===========================================

// Buat file PDF dummy untuk download
function createDummyPDF() {
    // Simulasi pembuatan file PDF dummy
    // Dalam implementasi nyata, file PDF sudah ada di folder assets
    console.log('File materi.pdf siap untuk diunduh');
}

// Event listener untuk tombol download
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Jika file tidak ada, tampilkan pesan
            // Dalam implementasi nyata, file PDF harus ada di folder assets
            console.log('Mengunduh file materi.pdf...');
            
            // Optional: Tampilkan notifikasi download
            showDownloadNotification();
        });
    }
});

// Fungsi notifikasi download
function showDownloadNotification() {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>📥</span>
            <p>Download dimulai! Silakan cek folder Downloads Anda.</p>
        </div>
    `;
    
    // Styling notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4e54c8, #8f94fb);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Fungsi untuk highlight syntax (jika diperlukan)
function highlightCode() {
    const codeBlocks = document.querySelectorAll('code');
    codeBlocks.forEach(block => {
        block.style.background = '#f4f4f4';
        block.style.padding = '2px 4px';
        block.style.borderRadius = '3px';
        block.style.fontFamily = 'monospace';
    });
}

// Fungsi untuk lazy loading images (jika ada)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===========================================
// PERFORMANCE & ACCESSIBILITY
// ===========================================

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'style/styles.css',
        // Tambahkan resource penting lainnya
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Focus management untuk accessibility
function manageFocus() {
    // Pastikan focus visible untuk keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize semua fungsi saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    highlightCode();
    lazyLoadImages();
    preloadResources();
    manageFocus();
    createDummyPDF();
    
    console.log('🎨 AnimEdu Website berhasil dimuat!');
    console.log('📚 Selamat belajar animasi 2D & 3D!');
});