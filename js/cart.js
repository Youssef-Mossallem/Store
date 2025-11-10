let InCart = JSON.parse(window.localStorage.getItem("cart")) || [];
let savedTotal = parseFloat(localStorage.getItem("totalPrice")) || 0;

let cartItems = document.querySelector(".cart-items");
let totalElement = document.querySelector(".cart-total");
let sumPrice = 0;

// دالة لإظهار رسالة "السلة فارغة"
function showEmptyMessage() {
  if (InCart.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-cart-message";
    emptyMessage.innerText = "The cart is empty";
    cartItems.appendChild(emptyMessage);
    totalElement.innerText = "Total: 0$";
    localStorage.setItem("totalPrice", "0");
  }
}

// دالة لعرض التوست
function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#e74c3c";
  toast.style.color = "white";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  toast.style.fontSize = "16px";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0.95";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 500);
}

// عرض المنتجات في السلة
if (InCart.length === 0) {
  showEmptyMessage();
} else {
  InCart.forEach((product, index) => {
    let divItem = document.createElement("div");
    let img = document.createElement("img");
    let divDetails = document.createElement("div");
    let divName = document.createElement("div");
    let divPrice = document.createElement("div");
    let button = document.createElement("button");

    // إعداد الكلاسات
    divItem.className = "cart-item";
    img.className = "product-image";
    divDetails.className = "cart-item-details";
    divName.className = "cart-item-name";
    divPrice.className = "cart-item-price";
    button.className = "remove-from-cart-btn";

    // تعبئة البيانات
    img.src = product.img;
    divName.innerText = product.name;
    divPrice.innerText = product.price;
    button.innerText = "Remove from Cart";
    img.loading = "lazy";
    // تركيب العنصر
    divDetails.appendChild(divName);
    divDetails.appendChild(divPrice);
    divItem.appendChild(img);
    divItem.appendChild(divDetails);
    divItem.appendChild(button);
    cartItems.appendChild(divItem);

    // تحديث السعر الكلي
    let price = +product.price.replace(" $", "");
    sumPrice += price;
    totalElement.innerText = `Total: ${sumPrice}$`;
    localStorage.setItem("totalPrice", sumPrice); // ← حفظ السعر في localStorage

    // عند الضغط على زر الحذف
    button.addEventListener("click", () => {
      divItem.remove();
      sumPrice -= price;
      totalElement.innerText = `Total: ${sumPrice}$`;
      localStorage.setItem("totalPrice", sumPrice); // ← تحديث السعر بعد الحذف

      // حذف من المصفوفة وتحديث localStorage
      InCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(InCart));

      showToast("Removed from cart");

      if (InCart.length === 0) {
        showEmptyMessage();
      }
    });
  });
}
// إضافة وظيفة لإظهار وإخفاء القائمة عند الضغط على الأيقونة
document.getElementById("menuIcon").addEventListener("click", function () {
  let navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("show");
});
