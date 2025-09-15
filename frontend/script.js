// Example pet data (later can come from database)
const pets = [
  { name: "Buddy", age: "2 years", breed: "Dog", image: "https://images.happypet.care/images/20192/golden-retriever-protrait.webp", desc: "Friendly Golden Retriever." },
  { name: "Mittens", age: "1 year", breed: "Cat", image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg", desc: "Playful tabby cat." },
  { name: "Charlie", age: "3 years", breed: "Dog", image: "https://www.petlandflorida.com/wp-content/uploads/2019/09/Petland_Florida_Cavalier_King_Charles_Spaniel_puppy.jpg", desc: "Energetic Beagle." },
  { name: "Luna", age: "6 months", breed: "Cat", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXUYGo1NXTS4Y0CEgE2zq6Zi5yuLxPLwwgGA&s", desc: "Curious Siamese kitten." },
  { name : "Leo",age:"8 months", breed: "Cat", image:"https://www.paws.org/wp-content/uploads/2019/08/20171221-DSC_8211.jpg", desc: "Playful ash cat" },
  { name: "Moku", age:"11 months", breed:"Dog", image:"https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&quality=85&auto=format&fit=max&s=1aaf31e276b20b5d12d4bee49c5a99e2", desc: "Charming pug." },
  { name:"Elana", age:"6 months", breed:"Cat", image:"https://images.ctfassets.net/ub3bwfd53mwy/5WFv6lEUb1e6kWeP06CLXr/acd328417f24786af98b1750d90813de/4_Image.jpg?w=750", desc: "Cute and calm." },
  { name:"Ruby", age:"2 months", breed:"Dog", image:"https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525", desc: "Little Golden pup." }
];

const grid = document.querySelector(".grid");
const searchInput = document.getElementById("searchInput");
const filterBreed = document.getElementById("filterBreed");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const adoptNowBtn = document.getElementById("adoptNowBtn");

let selectedPet = null;

// Render pets
function displayPets(list) {
  grid.innerHTML = "";
  list.forEach(pet => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <div class="card-body">
        <div class="pet-name">${pet.name}</div>
        <div class="meta">${pet.age} | ${pet.breed}</div>
        <div class="card-actions">
          <button class="btn adopt-btn">Adopt</button>
          <button class="btn secondary details-btn">Details</button>
        </div>
      </div>
    `;

    // Adopt button opens modal
    card.querySelector(".adopt-btn").addEventListener("click", () => {
      selectedPet = pet;
      openPetModal(pet);
    });

    // Details button also opens modal
    card.querySelector(".details-btn").addEventListener("click", () => {
      selectedPet = pet;
      openPetModal(pet);
    });

    grid.appendChild(card);
  });
}

// Open modal with pet details
function openPetModal(pet) {
  modalTitle.textContent = pet.name;
  modalContent.innerHTML = `
    <img src="${pet.image}" style="width:100%; border-radius:10px; margin-bottom:10px;">
    <p><strong>Age:</strong> ${pet.age}</p>
    <p><strong>Breed:</strong> ${pet.breed}</p>
    <p>${pet.desc || "No description available."}</p>
  `;
  modalBackdrop.classList.remove("hidden");
}

// Close modal
closeModal.addEventListener("click", () => {
  modalBackdrop.classList.add("hidden");
  selectedPet = null;
});

// Adopt Now button in modal
adoptNowBtn.addEventListener("click", () => {
  if (selectedPet) {
    alert(`🎉 You adopted ${selectedPet.name}!`);
    modalBackdrop.classList.add("hidden");
    selectedPet = null;
  }
});

// Search & Filter
function filterPets() {
  const search = searchInput.value.toLowerCase();
  const breed = filterBreed.value.toLowerCase();
  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (breed === "" || p.breed.toLowerCase() === breed)
  );
  displayPets(filtered);
}

searchInput.addEventListener("input", filterPets);
filterBreed.addEventListener("change", filterPets);

// Initial Load
displayPets(pets);
