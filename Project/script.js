// Restaurant Data
const restaurants = [
  { name: "Pizza Hut", cuisine: "Italian", rating: 4.5, location: "City Center", timings: "10 AM - 11 PM", image:"pizzahut.png" },
  { name: "Café Coffee Day", cuisine: "Coffee & Snacks", rating: 4.2, location: "Mall Road", timings: "9 AM - 10 PM", image: "cafecoffeeday.avif" },
  { name: "McDonald's", cuisine: "Fast Food", rating: 4.0, location: "Downtown", timings: "10 AM - 12 AM", image: "McDonald's.avif" },
  { name: "Olive Garden", cuisine: "Italian", rating: 4.3, location: "High Street", timings: "11 AM - 11 PM", image: "olivegarden.jpeg" },
  { name: "KFC", cuisine: "Fast Food", rating: 4.1, location: "Central Plaza", timings: "10 AM - 11 PM", image: "kfc.png" },
  { name: "Starbucks", cuisine: "Coffee & Snacks", rating: 4.4, location: "Main Square", timings: "7 AM - 11 PM", image: "starbucks.png" },
  { name: "Domino's Pizza", cuisine: "Italian", rating: 4.6, location: "North Avenue", timings: "10 AM - 11 PM", image: "dominos.jpeg" },
  { name: "Subway", cuisine: "Fast Food", rating: 4.2, location: "Central Market", timings: "9 AM - 10 PM", image: "subway.jpeg" },
  { name: "Barista", cuisine: "Coffee & Snacks", rating: 4.3, location: "East End", timings: "7 AM - 10 PM", image: "barista.png" },
  { name: "Cicis Pizza", cuisine: "Italian", rating: 4.0, location: "West Street", timings: "11 AM - 11 PM", image: "cicis.png" },
  { name: "Burger King", cuisine: "Fast Food", rating: 4.1, location: "Downtown Plaza", timings: "10 AM - 12 AM", image: "burgerking.jpg" },

];

// --- List Page ---
if (document.body.classList.contains("list-page")) {
  const container = document.getElementById("restaurantContainer");
  const searchBar = document.getElementById("searchBar");
  const cuisineFilter = document.getElementById("cuisineFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const noResults = document.getElementById("noResults");

  function renderRestaurants() {
    container.innerHTML = "";
    const searchText = searchBar.value.toLowerCase();
    const cuisine = cuisineFilter.value.toLowerCase();
    const minRating = parseFloat(ratingFilter.value);

    let visible = 0;
    restaurants.forEach(r => {
      if (
        r.name.toLowerCase().includes(searchText) &&
        (cuisine === "" || r.cuisine.toLowerCase() === cuisine) &&
        r.rating >= minRating
      ) {
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
          <img src="${r.image}" alt="${r.name}">
          <h3>${r.name}</h3>
          <p>⭐ ${r.rating} | ${r.cuisine}</p>
        `;
        card.onclick = () => {
          localStorage.setItem("selectedRestaurant", JSON.stringify(r));
          window.location.href = "detail.html";
        };
        container.appendChild(card);
        visible++;
      }
    });

    noResults.style.display = visible === 0 ? "block" : "none";
  }

  searchBar.addEventListener("keyup", renderRestaurants);
  cuisineFilter.addEventListener("change", renderRestaurants);
  ratingFilter.addEventListener("change", renderRestaurants);

  renderRestaurants();
}

// --- Detail Page ---
if (document.body.classList.contains("detail-page")) {
  const data = JSON.parse(localStorage.getItem("selectedRestaurant"));
  if (data) {
    document.getElementById("detailName").innerText = data.name;
    document.getElementById("detailImage").src = data.image;
    document.getElementById("detailCuisine").innerText = `Cuisine: ${data.cuisine}`;
    document.getElementById("detailRating").innerText = `⭐ Rating: ${data.rating}`;
    document.getElementById("detailLocation").innerText = `📍 Location: ${data.location}`;
    document.getElementById("detailTimings").innerText = `🕒 Timings: ${data.timings}`;
  }
}

// --- Review Page ---
if (document.body.classList.contains("review-page")) {
  const form = document.getElementById("reviewForm");
  const list = document.getElementById("reviewsList");
  const restaurantSelect = document.getElementById("reviewRestaurant");

  // Populate dropdown only once
  if (restaurantSelect.options.length === 0) {
    restaurants.forEach(r => {
      const option = document.createElement("option");
      option.value = r.name;
      option.textContent = r.name;
      restaurantSelect.appendChild(option);
    });
  }

  function loadReviews() {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    list.innerHTML = "";
    saved.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${r.restaurant}</strong><br>
                      👤 ${r.name} - ${"⭐".repeat(r.rating)}<br>
                      ${r.text}`;
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const restaurant = restaurantSelect.value;
    const name = document.getElementById("reviewName").value;
    const rating = parseInt(document.getElementById("reviewRating").value);
    const text = document.getElementById("reviewText").value;

    if(!restaurant || !name || !rating || !text){
      alert("Please fill all fields!");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    saved.push({ restaurant, name, rating, text });
    localStorage.setItem("reviews", JSON.stringify(saved));

    form.reset();
    loadReviews();
  });

  loadReviews();
}
