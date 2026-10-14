const films = [
    { id: "garden", title: "Mèo Mây và khu vườn", category: "Phiêu lưu", duration: "12 phút", quality: "1080p", views: 12800, updated: 4, image: "assets/garden.svg", summary: "Một khu vườn nhỏ đầy điều kỳ diệu đang chờ Mèo Mây khám phá." },
    { id: "train", title: "Chuyến tàu sắc màu", category: "Bạn bè", duration: "18 phút", quality: "720p", views: 24500, updated: 3, image: "assets/train.svg", summary: "Cùng các bạn nhỏ đi qua những miền đất rực rỡ trên chuyến tàu đặc biệt." },
    { id: "rabbit", title: "Thỏ Nâu tìm bạn", category: "Tình bạn", duration: "10 phút", quality: "1080p", views: 31900, updated: 2, image: "assets/rabbit.svg", summary: "Thỏ Nâu học cách lắng nghe và kết bạn với những người hàng xóm mới." },
    { id: "planet", title: "Hành tinh tí hon", category: "Khám phá", duration: "21 phút", quality: "720p", views: 8700, updated: 1, image: "assets/planet.svg", summary: "Một chuyến du hành tưởng tượng khám phá những điều kỳ thú ngoài không gian." }
];

const list = document.getElementById("film-list");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
const playerTitle = document.getElementById("player-title");
const filmSummary = document.getElementById("film-summary");
const viewCount = document.getElementById("view-count");
const qualityBadge = document.getElementById("quality-badge");
const video = document.getElementById("html5-player");
const youtube = document.getElementById("youtube-player");

let selectedFilm = films[0];

function renderFilms() {
    const query = searchInput.value.trim().toLocaleLowerCase("vi");
    const visibleFilms = films
        .filter(film => film.title.toLocaleLowerCase("vi").includes(query))
        .sort((first, second) => sortSelect.value === "popular" ? second.views - first.views : second.updated - first.updated);

    list.replaceChildren();
    resultCount.textContent = `${visibleFilms.length} phim`;
    emptyState.hidden = visibleFilms.length > 0;

    for (const film of visibleFilms) {
        const button = document.createElement("button");
        button.className = `film-card${film.id === selectedFilm.id ? " selected" : ""}`;
        button.type = "button";
        button.setAttribute("aria-pressed", String(film.id === selectedFilm.id));
        button.innerHTML = `<img src="${film.image}" alt="" class="film-thumb"><span class="film-card-copy"><strong>${film.title}</strong><small>${film.category} <span>·</span> ${film.duration}</small></span><span class="film-quality">${film.quality}</span>`;
        button.addEventListener("click", () => selectFilm(film));
        list.append(button);
    }
}

function selectFilm(film) {
    selectedFilm = film;
    playerTitle.textContent = film.title;
    filmSummary.textContent = film.summary;
    viewCount.textContent = `${film.views.toLocaleString("vi-VN")} lượt xem`;
    qualityBadge.textContent = `HD · ${film.quality}`;
    video.poster = film.image;
    renderFilms();
}

searchInput.addEventListener("input", renderFilms);
sortSelect.addEventListener("change", renderFilms);

document.querySelectorAll(".player-mode").forEach(button => {
    button.addEventListener("click", () => {
        const useYoutube = button.dataset.mode === "youtube";
        video.hidden = useYoutube;
        youtube.hidden = !useYoutube;
        document.querySelectorAll(".player-mode").forEach(modeButton => {
            modeButton.classList.toggle("active", modeButton === button);
        });
    });
});

renderFilms();
