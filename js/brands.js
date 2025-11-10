let url = "../product.json";
let productContainer = document.querySelector(".product-container");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let addedCategories = new Set();

    data.forEach((product) => {
      if (!addedCategories.has(product.category)) {
        addedCategories.add(product.category);

        // إنشاء card
        let card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}" class="product-image" />
          <h3 class="product-name">${product.category}</h3>
          <div class="product-footer">
            <button class="add-to-cart-btn">
              Show <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        `;

        // إضافة الحدث للزر
        const button = card.querySelector(".add-to-cart-btn");
        button.addEventListener("click", () => {
          localStorage.setItem("selectedCategory", product.category);
          // مثلاً ننتقل لصفحة category.html
          window.location.href = "index.html";
        });

        productContainer.appendChild(card);
      }
    });
  })
  .catch((error) => console.error("حدث خطأ أثناء تحميل البيانات:", error));
