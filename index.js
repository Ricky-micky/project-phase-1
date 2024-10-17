const swip = new Swiper('.swip', {
    autoplay:{
        delay:2000,
        disableOnIntaration: false,
    },
    
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
  });

//  post 1#






// end post 1#
  const gallery = document.getElementById('gallery');
  const hotelModal = document.getElementById('modal'); // Ensure this element exists in your HTML
  const modalImage = document.getElementById('modalImage'); // Ensure this element exists
  const captionText = document.getElementById('caption'); // Ensure this element exists
  

  
  // Fetch posts from db.json
  async function fetchHotels() {
      try {
          const response = await fetch('db.json');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          displayHotels(data.hotels);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
  }
  
  // Display hotels in a grid
  function displayHotels(hotels) {
      gallery.innerHTML = '';
      hotels.forEach(hotel => {
          const hotelDiv = document.createElement('div');
          hotelDiv.className = 'post';
          hotelDiv.innerHTML = `
              <h3>${hotel.name}</h3>
              <img src="${hotel.image}" alt="${hotel.description}" onclick="openModal('${hotel.image}', '${hotel.description}')">
              <p>${hotel.location}</p>
              <p>${hotel.description}</p>
              <button onclick="deleteHotel('${hotel.id}')">Delete Hotel</button>
          `;
          gallery.appendChild(hotelDiv);
      });
  }
  
  // Placeholder function to add a new hotel
  document.getElementById('addPostButton').addEventListener('click', () => {
      alert("Functionality to add a hotel is not implemented.");
  });
  
  // Placeholder function to delete a hotel
  function deleteHotel(id) {
      alert(`Functionality to delete hotel with ID ${id} is not implemented.`);
  }
  
  // Open modal to view the image
  function openModal(imageSrc, description) {
      hotelModal.style.display = "block";
      modalImage.src = imageSrc;
      captionText.innerHTML = description;
  }
  
  // Close the modal
  hotelModal.querySelector('.close').onclick = function() {
      hotelModal.style.display = "none";
  };
  
  // Fetch hotels on page load
  fetchHotels();
  



// Modal booking functionality
document.getElementById('saveBookingButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
    const departureDate = document.getElementById('departureDate').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const maritalStatus = document.getElementById('maritalStatus').value;

    // Process the data as needed (e.g., send it to a server)
    console.log('Booking Information:', { name, email, age, country, departureDate, arrivalDate, maritalStatus });

    // Optionally close the modal after processing
    $('#exampleModal').modal('hide');

    // Alert or display a message
    alert("Booking information saved!");
});

// Post 2 safari
const db = {
    "safaris": [
        {
            "id": "1",
            "name": "Maasai Mara Adventure",
            "location": "Maasai Mara National Reserve, Kenya",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwzFLoIPdK_LupTc2t1Q8leF_V5esB4O71g&s",
            "description": "Experience the thrill of a safari in one of the world's most famous wildlife reserves, known for the Great Migration and rich biodiversity."
        },
        {
            "id": "2",
            "name": "Serengeti Exploration",
            "location": "Serengeti National Park, Tanzania",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI2I0O8I9EfZXnsdq7LjAgflUK3xM0ReAwUA&s",
            "description": "Explore the vast plains of the Serengeti, home to lions, elephants, and the annual wildebeest migration."
        },
        {
            "id": "3",
            "name": "Tsavo Safari",
            "location": "Tsavo National Park, Kenya",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgk11kkTjUfkqHpse6TePsXCJ6zlHWLZkQFw&s",
            "description": "Discover the diverse ecosystems of Tsavo, featuring vast savannahs, mountains, and the famous red elephants."
        },
        {
            "id": "4",
            "name": "Kruger National Park Expedition",
            "location": "Kruger National Park, South Africa",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWCDVA1DZxYCgZ1s_IoU9q6LAZiKwxPaXbB_oU55cnK-1yxRCTJ4S3cE9oSQVuW6pB-E4&usqp=CAU",
            "description": "Embark on an unforgettable safari experience in Kruger National Park, home to the Big Five and a wide variety of wildlife."
        }
    ]
};

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    
    db.safaris.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card">
                <img src="${post.image}" class="card-img-top image-preview" alt="${post.name}" data-id="${post.id}">
                <div class="card-body">
                    <h5 class="card-title">${post.name}</h5>
                    <p class="card-text">Location: ${post.location}</p>
                    <p class="card-text">${post.description}</p>
                    <button class="btn btn-danger" onclick="deletePost('${post.id}')">Delete Post</button>
                </div>
            </div>
        `;
        postsContainer.appendChild(col);
    });

    // Add click event for image modal
    document.querySelectorAll('.image-preview').forEach(image => {
        image.addEventListener('click', function() {
            openModal(this.src, this.alt); // Using the image src and alt for modal
        });
    });
}

// Function to add a post
document.getElementById('addPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newPost = {
        id: (db.safaris.length + 1).toString(),
        name: document.getElementById('postName').value,
        location: document.getElementById('postLocation').value,
        image: document.getElementById('postImage').value,
        description: document.getElementById('postDescription').value
    };

    db.safaris.push(newPost);
    displayPosts();
    $('#addPostModal').modal('hide');
});

// Function to delete a post
function deletePost(id) {
    db.safaris = db.safaris.filter(post => post.id !== id);
    displayPosts();
}

// Initial display
displayPosts();

// Modal booking functionality
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const parkName = document.getElementById('parkName').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const specialActivities = document.getElementById('specialActivities').value;

    // Process the booking data
    console.log('Booking Information:', { parkName, name, email, age, maritalStatus, specialActivities });

    // Show success alert
    alert("You have successfully booked your safari!");

    // Show cancel button
    const cancelButton = document.getElementById('cancelBookingButton');
    cancelButton.style.display = 'block';

    // Optionally close the modal
    $('#bookingSafariModal').modal('hide');
});

// Cancel booking functionality
document.getElementById('cancelBookingButton').addEventListener('click', function() {
    alert("Your booking has been canceled.");
    document.getElementById('bookingForm').reset();
    this.style.display = 'none'; // Hide the cancel button again
});

// Post-3-safari blue
const posts = [
    {
   
      "id": "1",
      "name": "Safari Blue Adventure",
      "location": "Wasini Island, Kenya",
      "description": "Embark on a thrilling adventure exploring the turquoise waters and vibrant marine life of Wasini Island. Enjoy snorkeling, dolphin watching, and a delicious seafood lunch.",
      "price": 120,
      "duration": "Full Day",
      "activities": [
        "Snorkeling",
        "Dolphin Watching",
        "Swahili Lunch on the Beach"
      ],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RKkhjNI7lPHxO3j4UiS0lGq6HgFFmBH8dg&s"
    },
    {
      "id": "2",
      "name": "Mombasa Marine Safari",
      "location": "Mombasa, Kenya",
      "description": "Discover the beauty of Mombasa’s coastal waters with a marine safari. Explore coral reefs and enjoy swimming and sunbathing on pristine beaches.",
      "price": 90,
      "duration": "Half Day",
      "activities": [
        "Glass-Bottom Boat Tour",
        "Snorkeling",
        "Beach Relaxation"
      ],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsbHWoF-pWDyTELf_vsIjfc5vnrpCn--KRA&s"
    },
    {
      "id": "3",
      "name": "Lamu Cultural Safari",
      "location": "Lamu Island, Kenya",
      "description": "Immerse yourself in the rich culture of Lamu Island. Explore the historical sites, local markets, and enjoy traditional Swahili cuisine.",
      "price": 150,
      "duration": "2 Days",
      "activities": [
        "Historical Site Tours",
        "Swahili Cooking Class",
        "Cultural Performances"
      ],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pckxzmcpLfmQyALKqnyuASsxH0csBgAHfuWX3r20947NAJPhZfCD1NrMbGd4q6hqZws&usqp=CAU"
    },
    {
      "id": "4",
      "name": "Diani Beach Getaway",
      "location": "Diani Beach, Kenya",
      "description": "Relax on the stunning Diani Beach while enjoying various water sports and beach activities. Perfect for families and adventure seekers alike.",
      "price": 110,
      "duration": "Full Day",
      "activities": [
        "Jet Skiing",
        "Parasailing",
        "Beach Volleyball"
      ],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThNb_75tCOPBksc1UbtBz5QURPwh9FgmIEVw&s"
    }
  ]

  let bookingData = null;

  document.getElementById('bookingForm').addEventListener('submit', function(e) {
      e.preventDefault();

      // Collect form data
      bookingData = {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          hotel: document.getElementById('hotel').value,
          checkIn: document.getElementById('checkIn').value,
          checkOut: document.getElementById('checkOut').value,
          numGuests: document.getElementById('numGuests').value,
          preferences: document.getElementById('preferences').value
      };

      // Log the booking data (replace this with actual form submission)
      console.log('Booking Data:', bookingData);

      // Show cancel and edit buttons
      document.getElementById('cancelButton').style.display = 'block';
      document.getElementById('editButton').style.display = 'block';

      // Alert user
      alert('Your booking request has been submitted!');
      
      // Reset form
      this.reset();
  });

  // Cancel booking functionality
  document.getElementById('cancelButton').addEventListener('click', function() {
      bookingData = null; // Clear booking data
      alert('Submission canceled');
      
      // Hide buttons after cancellation
      this.style.display = 'none';
      document.getElementById('editButton').style.display = 'none';
  });

  // Edit booking functionality
  document.getElementById('editButton').addEventListener('click', function() {
      if (bookingData) {
          document.getElementById('fullName').value = bookingData.fullName;
          document.getElementById('email').value = bookingData.email;
          document.getElementById('phone').value = bookingData.phone;
          document.getElementById('hotel').value = bookingData.hotel;
          document.getElementById('checkIn').value = bookingData.checkIn;
          document.getElementById('checkOut').value = bookingData.checkOut;
          document.getElementById('numGuests').value = bookingData.numGuests;
          document.getElementById('preferences').value = bookingData.preferences;

          alert('You can now edit your booking details.');
      }
  });

   


// slide 2
const swiper = new Swiper('.swiper', {
    autoplay:{
        delay:2000,
        disableOnIntaration: false,
    },
    
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
  });