// Daftar kata untuk setiap stage
const wordList = [
    'BUKU', 'KAKI', 'MATA', 'GULA', 'KOPI', 'SAPI', 'AYAH', 'IBU', 'ROTI', 'JARI',
    'BOLA', 'TAS', 'SEPATU', 'LAPTOP', 'MEJA', 'PINTU', 'LAMP', 'BANGKU', 'TEMAN', 'BUAH',
    'RUMAH', 'SEKOLAH', 'PESAWAT', 'PESAN', 'KERETA', 'KELAS', 'ANGIN', 'BUNGA', 'MOBIL', 'GITAR',
    'BAJU', 'BINTANG', 'CERITA', 'HUTAN', 'KASUR', 'PESTA', 'LOMBA', 'KERTAS', 'PAPAN', 'LUKIS',
    'MUSIK', 'ANGGUR', 'CABANG', 'DAUN', 'MELON', 'JAGUNG', 'KAPAL', 'CITRA', 'LUKA', 'PELAUT',
    'SEPEDA', 'MENARI', 'GELAS', 'MANGGA', 'TELUR', 'ANGKA', 'HADIAH', 'MAINAN', 'KAMAR', 'LUMBUNG',
    'TANGAN', 'BOLA', 'PENJARA', 'KULIT', 'KERAJAAN', 'JARING', 'KAYU', 'KEPALA', 'KATAK', 'RAMBUT',
    'KEMEJA', 'KEJU', 'LOMBA', 'PANTAI', 'JAKET', 'KAOS', 'PESAWAT', 'MOTOR', 'HEWAN', 'BIBIR',
    'PESAWAT', 'ANAK', 'PENASARAN', 'BINTANG', 'BINATANG', 'PESAWAT', 'PLANET', 'KERAN', 'TEMBOK', 'PELUANG',
    'PENJAGA', 'BANGUNAN', 'RAJA', 'PENJELAJAH', 'TANAMAN', 'SAMPAH', 'KULKAS', 'HOBI', 'PEKERJAAN', 'HADIAH'
];

// Inisialisasi variabel
let currentStage = 1;
let score = 0;
let timeLeft = 60; 
let totalTime = 0; // Menyimpan total waktu yang dihabiskan
let timerInterval;

// Elemen DOM
const letterContainer = document.getElementById('letter-container');
const wordContainer = document.getElementById('word-container');
const result = document.getElementById('result');
const checkButton = document.getElementById('check-word');
const restartLevelButton = document.getElementById('restart-level');
const stageDisplay = document.getElementById('stage-display');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const timerSlider = document.getElementById('timer-slider');
const gameOverModal = document.getElementById('game-over-modal');
const playAgainButton = document.getElementById('play-again');

// Elemen modal untuk "Tamat"
const gameFinishedModal = document.getElementById('game-finished-modal');
const finalScoreDisplay = document.getElementById('final-score');
const totalTimeDisplay = document.getElementById('total-time');
const playAgainFinishedButton = document.getElementById('play-again-finished');

// Fungsi untuk mengacak huruf dalam array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Memulai stage
function startStage() {
    stageDisplay.textContent = `Level ${currentStage}`;
    scoreDisplay.textContent = `Score : ${score}`;
    wordContainer.textContent = '';
    result.textContent = '';

    // Kata target untuk stage
    targetWord = wordList[currentStage - 1].toUpperCase();

    // Huruf acak
    let letters = shuffle([...targetWord.split(''), 'A', 'I', 'U', 'E']);
    letterContainer.innerHTML = '';

    // Tampilkan huruf baru
    letters.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;

        letterElement.addEventListener('click', () => {
            wordContainer.textContent += letter; // Menambahkan huruf ke kata yang sedang dibentuk
            
            // Tambahkan kelas animasi
            letterElement.classList.add('scale-out');

            // Menghapus huruf setelah animasi selesai
            setTimeout(() => {
                letterElement.remove();
            }, 400); 
        });
        letterContainer.appendChild(letterElement);
    });
}

// Fungsi untuk memeriksa kata yang disusun
checkButton.addEventListener('click', () => {
    const currentWord = wordContainer.textContent;
    if (currentWord === targetWord) {
        result.textContent = 'Benar! Kamu berhasil menyelesaikan stage.';
        result.style.color = 'green';
        score += 100; 
        timeLeft += 10;

        // Update slider saat menang
        timerSlider.value = timeLeft;

        // Lanjut ke stage berikutnya
        if (currentStage < wordList.length) {
            currentStage++;
            startStage();
        } else {
            showGameFinishedModal(); // Tampilkan modal "Tamat" jika semua stage selesai
            clearInterval(timerInterval);
        }
    } else {
        result.textContent = 'Salah. Coba lagi!';
        result.style.color = 'red';
    }
});

// Fungsi untuk mengatur timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            totalTime++; // Tambahkan total waktu yang dihabiskan
            timerDisplay.textContent = ` ${timeLeft}`;
            timerSlider.value = timeLeft; // Update slider sesuai waktu tersisa
        } else {
            clearInterval(timerInterval);
            showGameOverModal();
        }
    }, 1000);
}

// Fungsi untuk menampilkan modal game over
function showGameOverModal() {
    gameOverModal.style.display = 'block'; 
    gameOverModal.classList.add('scale');
}

// Fungsi untuk menampilkan modal "Tamat"
function showGameFinishedModal() {
    gameFinishedModal.style.display = 'block'; 
    finalScoreDisplay.textContent = `Score kamu: ${score}`;
    totalTimeDisplay.textContent = `Total waktu yang dihabiskan: ${totalTime} detik`;
}

// Fungsi untuk restart level
restartLevelButton.addEventListener('click', () => {
    startStage(); // Hanya mulai ulang stage tanpa mereset waktu
});

// Fungsi untuk memulai ulang permainan dari modal "Tamat"
playAgainFinishedButton.addEventListener('click', () => {
    currentStage = 1;
    score = 0;
    timeLeft = 60; // Reset waktu untuk permainan baru
    totalTime = 0; // Reset total waktu
    timerDisplay.textContent = `${timeLeft}`;
    timerSlider.value = timeLeft;
    gameFinishedModal.style.display = 'none';
    startStage();
    startTimer();
});

// Fungsi untuk memulai ulang permainan dari modal "Game Over"
playAgainButton.addEventListener('click', () => {
    currentStage = 1;
    score = 0;
    timeLeft = 60; // Reset waktu untuk permainan baru
    totalTime = 0; // Reset total waktu
    timerDisplay.textContent = `${timeLeft}`;
    timerSlider.value = timeLeft;
    gameOverModal.style.display = 'none';
    startStage();
    startTimer();
});

// Memulai stage dan timer
startStage();
startTimer();