let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

let favContainer = document.querySelector(".favourite-items");

function showEmptyMessage() {
  let msg = document.createElement("p");
  msg.className = "empty-fav-message";
  msg.innerText = "You don't have any favourite products yet.";
  favContainer.appendChild(msg);
}

if (favourites.length === 0) {
  showEmptyMessage();
} else {
  favourites.forEach((product, index) => {
    let div = document.createElement("div");
    div.className = "fav-item";

    div.innerHTML = `
      <img src="${product.img}" class="product-image" loading="lazy" />
      <div class="fav-details">
        <div class="fav-name">${product.name}</div>
        <div class="fav-price">${product.price}</div>
      </div>
      <button class="remove-fav-btn">Remove</button>
    `;

    favContainer.appendChild(div);

    div.querySelector(".remove-fav-btn").addEventListener("click", () => {
      div.remove();
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      if (favourites.length === 0) showEmptyMessage();
    });
  });
}

// إظهار وإخفاء القائمة الجانبية
document.getElementById("menuIcon").addEventListener("click", function () {
  let navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("show");
});
