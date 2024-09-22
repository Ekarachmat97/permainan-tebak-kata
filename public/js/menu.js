// Elemen DOM
const playButton = document.getElementById('play-button');
const settingsButton = document.getElementById('settings-button');
const exitButton = document.getElementById('exit-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsButton = document.getElementById('close-settings');
const backgroundMusic = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');

// Fungsi untuk memulai background musik
window.addEventListener('load', () => {
    backgroundMusic.volume = 0.5; // Atur volume default
    backgroundMusic.play().catch(error => {
        // Tangani jika autoplay dicegah oleh browser
        console.log('Autoplay di-block oleh browser:', error);
    });
});

// Tombol 'Main' untuk memulai permainan
playButton.addEventListener('click', () => {
    window.location.href = '../public/pages/game.html'; // Redirect ke halaman game utama
});

// Tombol 'Pengaturan' untuk membuka modal pengaturan
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Tombol 'Tutup' untuk menutup modal pengaturan
closeSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Pengaturan volume dari slider
volumeSlider.addEventListener('input', () => {
    backgroundMusic.volume = volumeSlider.value / 100; // Ubah volume sesuai slider
});

// Tombol 'Keluar' untuk keluar dari permainan
exitButton.addEventListener('click', () => {
    if (confirm('Apakah kamu yakin ingin keluar dari game?')) {
        window.close(); // Coba untuk menutup jendela (tidak selalu berhasil di browser)
    }
});

// Fungsi untuk splash screen
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan splash screen selama 3 detik, lalu sembunyikan
    setTimeout(function() {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 3000); // Waktu splash screen, 3000ms (3 detik)
});
