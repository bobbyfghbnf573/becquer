// Definir las canciones manualmente en una lista
const songs = [
    'musica/song1.mp3',
    'musica/song2.mp3',
    'musica/song3.mp3'
];

let currentIndex = 0;
let audio = new Audio();
let isPlaying = false;

// Cargar la canción actual
function loadSong(index) {
    audio.src = songs[index];
    audio.currentTime = 0; // Para empezar desde el inicio
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('selected'); // Remover la clase "selected"
    });
    document.querySelector(`.song-item[data-index="${index}"]`).classList.add('selected'); // Marcar la canción seleccionada
}

// Al cargar la página, cargar la primera canción
window.onload = function() {
    loadSong(currentIndex);
};

// Reproducir o pausar la música
document.getElementById('play-pause').addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('play-pause').textContent = '▶️';
    } else {
        audio.play();
        isPlaying = true;
        document.getElementById('play-pause').textContent = '⏸️';
    }
});

// Reproducir la siguiente canción
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    document.getElementById('play-pause').textContent = '⏸️';
});

// Reproducir la canción anterior
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    document.getElementById('play-pause').textContent = '⏸️';
});

// Ir al inicio de la canción
document.getElementById('rewind').addEventListener('click', () => {
    audio.currentTime = 0;
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        document.getElementById('play-pause').textContent = '⏸️';
    }
});

// Hacer clic en una canción de la lista para seleccionarla
document.querySelectorAll('.song-item').forEach(item => {
    item.addEventListener('click', () => {
        currentIndex = parseInt(item.getAttribute('data-index'));
        loadSong(currentIndex);
        audio.play();
        isPlaying = true;
        document.getElementById('play-pause').textContent = '⏸️';
    });
});
