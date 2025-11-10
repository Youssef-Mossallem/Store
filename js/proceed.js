// Load cart total from localStorage
document.getElementById("cart-total").innerText =
  localStorage.getItem("totalPrice") + "$";
const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;

// Handle form submission
const form = document.getElementById("checkout-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show confirmation message
  document.getElementById("success-message").style.display = "block";

  // Clear cart (optional)
  localStorage.removeItem("cart");
  localStorage.setItem("cartTotal", "0");
  setTimeout(() => {
    window.location = "index.html";
  }, 1000);
});
