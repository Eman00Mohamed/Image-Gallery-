function searchImages() {
  let searchInput = document.getElementById("search").value.toLowerCase();
  let images = document.querySelectorAll(".gallary .images .card");

  images.forEach(card => {
      let imgAlt = card.querySelector("img").alt.toLowerCase();
      let photographer = card.querySelector(".photographer span").innerText.toLowerCase();

      if (imgAlt.includes(searchInput) || photographer.includes(searchInput)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  });
}

// Select all download buttons
document.querySelectorAll('.card .button').forEach(button => {
  button.addEventListener('click', function () {
      // Find the closest image within the card
      const card = this.closest('.card');
      const img = card.querySelector('img');

      // Get image URL and generate a filename
      const imgURL = img.src;
      const filename = img.alt ? img.alt.replace(/\s+/g, "_") + ".jpg" : "downloaded_image.jpg";

      // Create temporary download link
      const link = document.createElement('a');
      link.href = imgURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxPhotographer = document.getElementById("lightbox-photographer");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.querySelector(".close-btn");
  const downloadBtn = document.getElementById("download-btn");

  // Open Lightbox on Image Click
  document.querySelectorAll(".card img").forEach(img => {
      img.addEventListener("click", function () {
          let card = this.closest(".card");
          let photographer = card.querySelector(".photographer span").innerText;

          lightbox.style.display = "flex";
          lightboxImg.src = this.src;
          lightboxImg.alt = this.alt;
          lightboxPhotographer.textContent = photographer;
          lightboxDesc.textContent = this.alt || "No description available";

          // Set download link
          downloadBtn.setAttribute("data-img", this.src);
          downloadBtn.setAttribute("data-name", this.alt || "downloaded_image.jpg");
      });
  });

  // Close Lightbox
  closeBtn.addEventListener("click", function () {
      lightbox.style.display = "none";
  });

  // Download Image from Lightbox
  downloadBtn.addEventListener("click", function () {
      let imgURL = this.getAttribute("data-img");
      let filename = this.getAttribute("data-name").replace(/\s+/g, "_") + ".jpg";

      const link = document.createElement("a");
      link.href = imgURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });

  // Close Lightbox on Click Outside
  lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
          lightbox.style.display = "none";
      }
  });
});