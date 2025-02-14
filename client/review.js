const url = `http://localhost:8080/api/review`;
function showForm() {
  document.getElementById("reviewForm").style.display = "block";
}
let reviewData = [];
async function fetchReviews() {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    reviewData = data.reviews;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  displayReviews(reviewData);
}
document.getElementById("starRating").addEventListener("click", function (e) {
    if (e.target.dataset.star) {
      const rating = e.target.dataset.star;
      document.getElementById("rating").value = rating;
      updateStarRating(rating);
    }
  });
  
  function updateStarRating(rating) {
    const stars = document.querySelectorAll("#starRating span");
    stars.forEach((star, index) => {
      star.classList.toggle("selected", index < rating);
    });
  }
    
function displayReviews(reviewList) {
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = "";

  reviewList.forEach(({ username, title, description, rating }) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="background-color: green; color: white; font-weight: bold; padding: 2px 5px; border-radius: 3px; margin-right: 5px;">${rating}★</span>
          <h4 style="margin: 0;">${title}</h4>
        </div>
        <p style="margin: 5px 0;">${description}</p>
        <p style="color: gray; font-size: 1em;">
          ${username} <span style="color: #5f9ea0;">✔ Certified Buyer</span>
        </p>
      `;
    reviewsContainer.appendChild(reviewCard);
  });
}

async function submitReview() {
    const username = document.getElementById("username").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const rating = document.getElementById("rating").value.trim();
  
    if (!username || !title || !description || !rating) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, title, description, rating }),
      });
  
      if (response.ok) {
        const newReview = await response.json();
        reviewData.push(newReview);
        displayReviews(reviewData);
        alert("Your Feedback Successfully added,Thank You")
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to submit the review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review");
    }
  
    document.getElementById("username").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("rating").value = "";
  }
  

fetchReviews();
