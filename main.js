const accessKey = "wrC5cOPL5eS7GpMwc5mApSIVyXuy2sgr6vBJd8r3XFw";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const apiUrl = `https://api.unsplash.com/search/photos?${page}=1&query=${keyword}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const results = data.results;
  if (page == 1) {
    searchResult.innerHTML = "";
  }
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  searchMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

searchMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
