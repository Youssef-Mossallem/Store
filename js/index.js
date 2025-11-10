document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "false") {
    logoutBtn.style.display = "block";
  } else {
    window.location.href = "register.html";
  }
  
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "register.html";
  });

  const selectedCategoryBox = document.getElementById("selected-category-box");
  const selectedCategoryName = document.getElementById(
    "selected-category-name"
  );
  const deleteCategoryBtn = document.getElementById("delete-category-btn");

  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    selectedCategoryBox.style.display = "block";
    selectedCategoryName.textContent = `Selected Category: ${selectedCategory}`;
  }

  deleteCategoryBtn.addEventListener("click", () => {
    localStorage.removeItem("selectedCategory");
    location.reload();
  });

  let productContainer = document.querySelector(".product-container");
  let url = "product.json";
  let products = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // إضافة تنسيق CSS للقلب داخل الـ JS
  const style = document.createElement("style");
  style.textContent = `
    .fav-heart {
      font-size: 20px;
      color: #ccc;
      cursor: pointer;
      transition: 0.3s ease;
      margin-left: 10px;
    }
    .fav-heart.active {
      color: red;
    }
    .product-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      products = selectedCategory
        ? data.filter((item) => item.category === selectedCategory)
        : data;
    })
    .then(() => {
      for (let i = 0; i < products.length; i++) {
        let product = products[i];

        let productFoter = document.createElement("div");
        productFoter.className = "product-footer";

        // زر السلة
        let btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.className = "add-to-cart-btn";

        // قلب المفضلة
        let favHeart = document.createElement("span");
        favHeart.innerHTML = "&#10084;"; // قلب ♥
        favHeart.className = "fav-heart";
        if (favourites.find((f) => f.name === product.name)) {
          favHeart.classList.add("active");
        }

        // عند الضغط على القلب
        favHeart.addEventListener("click", () => {
          favHeart.classList.toggle("active");
          let favItem = {
            img: product.img,
            name: product.name,
            price: product.price + " $",
          };

          if (favHeart.classList.contains("active")) {
            favourites.push(favItem);
          } else {
            favourites = favourites.filter((f) => f.name !== product.name);
          }

          localStorage.setItem("favourites", JSON.stringify(favourites));
        });

        productFoter.appendChild(btn);
        productFoter.appendChild(favHeart);

        // باقي عناصر المنتج
        let productDiv = document.createElement("div");
        let img = document.createElement("img");
        let pCategory = document.createElement("p");
        let h3Name = document.createElement("h3");
        let spanPrice = document.createElement("span");
        let rating = document.createElement("div");
        let star = document.createElement("span");

        img.src = product.img;
        pCategory.innerText = product.category;
        h3Name.innerText = product.name;
        spanPrice.innerText = product.price + " $";
        star.innerHTML = product.star;

        pCategory.className = "product-category";
        h3Name.className = "product-name";
        spanPrice.className = "product-price";
        rating.className = "product-rating";
        star.className = "star filled";
        productDiv.className = "product-card";
        img.className = "product-image";
        img.loading= "lazy"
        rating.appendChild(star);
        productDiv.appendChild(img);
        productDiv.appendChild(pCategory);
        productDiv.appendChild(h3Name);
        productDiv.appendChild(spanPrice);
        productDiv.appendChild(rating);
        productDiv.appendChild(productFoter);
        productContainer.appendChild(productDiv);
      }

      let cartBtn = document.querySelectorAll(".add-to-cart-btn");
      cartBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          let productCard = btn.parentElement.parentElement;
          let productImage = productCard.querySelector(".product-image").src;
          let productName =
            productCard.querySelector(".product-name").innerText;
          let productPrice =
            productCard.querySelector(".product-price").innerText;

          let cartItem = {
            img: productImage,
            name: productName,
            price: productPrice,
          };

          let toast = document.getElementById("toast");
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 1000);

          cart.push(cartItem);
          localStorage.setItem("cart", JSON.stringify(cart));
        });
      });
    })
    .catch((error) => console.error("حدث خطأ أثناء تحميل المنتجات:", error));
});
