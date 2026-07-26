const modal = document.getElementById('productModal');
const modalDetails = document.getElementById('modalDetails');
const closeBtn = document.querySelector('.close-btn');

// Define products and their image files here:
const productData = {
  harveys: {
    title: "Harvey's Brewery, Lewes",
    dimension: "Harvey’s completed tapestry measures  25cm x 12.5cm",
    description: "",
    images: [
      "images/products/harveys/harveys-hero.jpg",
      "images/products/harveys/harveys-set.jpeg",
      "images/products/harveys/harveys-front.jpeg",
      "images/products/harveys/harveys-back.jpeg",
      "images/products/harveys/harveys-starting-with-new-wool.jpg",
      "images/products/harveys/harveys-new-wool-secured-cut-off-knot.jpg",
      "images/products/harveys/harveys-stitching-right-to-left.jpg"
    ]
  },
  pavilion: {
    title: "Royal Pavilion, Brighton",
    dimension: "Royal Pavilion's completed tapestry measures 20cm x 13cm",
    description: "",
    images: [
      "images/products/pavilion/pavilion-hero.jpg",
      "images/products/pavilion/pavilion-set.jpeg",
      "images/products/pavilion/pavilion-front.jpeg",
      "images/products/pavilion/pavilion-back.jpeg",
      "images/products/pavilion/pavilion-first-stitch.jpg",
      "images/products/pavilion/pavilion-working-towards-the-knot.jpg",
      "images/products/pavilion/pavilion-first-section.jpg"
    ]
  }
};

let currentIndex = 0;
let currentImages = [];

function openModal(key) {
  const product = productData[key];
  if (!product) return;

  currentImages = product.images;
  currentIndex = 0;

  modalDetails.innerHTML = `
    <h2>${product.title}</h2>
    <p style="font-style: italic; color: #666;">${product.dimension}</p>

    <div class="modal-stage">
      <button id="prevBtn" class="modal-arrow modal-arrow--prev" type="button" aria-label="Previous image">&#10094;</button>

      <img id="mainImage" class="modal-main-image" src="${currentImages[0]}" alt="">

      <button id="nextBtn" class="modal-arrow modal-arrow--next" type="button" aria-label="Next image">&#10095;</button>
    </div>

    <div id="thumbnails" class="modal-thumbnails">
      ${currentImages.map((src, idx) => `
        <img src="${src}" data-index="${idx}" 
             class="modal-thumbnail"
             onclick="goToImage(${idx})">
      `).join('')}
    </div>
  `;

  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) modalContent.scrollTop = 0;
  highlightThumbnail(currentIndex);

  // Add arrow functionality
  document.getElementById('prevBtn').onclick = () => changeImage(-1);
  document.getElementById('nextBtn').onclick = () => changeImage(1);

  // Add swipe detection
  addSwipeSupport();
}

function goToImage(index) {
  currentIndex = index;
  document.getElementById('mainImage').src = currentImages[currentIndex];
  highlightThumbnail(currentIndex);
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  if (currentIndex >= currentImages.length) currentIndex = 0;
  document.getElementById('mainImage').src = currentImages[currentIndex];
  highlightThumbnail(currentIndex);
}

function highlightThumbnail(index) {
  const thumbnails = document.querySelectorAll('#thumbnails img');
  thumbnails.forEach((thumb, i) => {
    thumb.style.border = i === index ? '2px solid #333' : '2px solid transparent';
  });
}

function addSwipeSupport() {
  const image = document.getElementById('mainImage');
  let startX = 0;

  image.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  image.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;
    if (Math.abs(diff) > 30) {
      changeImage(diff > 0 ? 1 : -1);
    }
  });
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => {
  if (e.target === modal) modal.style.display = 'none';
};