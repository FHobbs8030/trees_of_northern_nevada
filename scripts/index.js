document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  const template = document.querySelector("#card-template");

  const openAddModalButton = document.querySelector(".profile__add-button");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const addModal = document.getElementById("add-modal");
  const editModal = document.getElementById("edit-modal");
  const editForm = document.forms["edit-form"];

  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const closeImageModalButton = document.querySelector("#image-modal-close");

  const cardForm = document.forms["card-form"];

  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const cardsContainer = document.querySelector("#cards-container");

  const imageLibrary = {
    "The Black Cottonwood": {
      name: "The Black Cottonwood",
      link: "http://127.0.0.1:5500/images/card-images/black_cottonwood_summer.jpg",
      alt: "A beautiful landscape of the Black Cottonwood",
    },
    "Yosemite Valley": {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      alt: "Yosemite Valley",
    },
    "Lake Louise": {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      alt: "Lake Louise",
    },
    "Bald Mountains": {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      alt: "Bald Mountains",
    },
    Latemar: {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      alt: "Latemar",
    },
    "Vanoise National Park": {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      alt: "Vanoise National Park",
    },
    "Lago di Braies": {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      alt: "Lago di Braies",
    },
  };

  const initialCards = [
    imageLibrary["Yosemite Valley"],
    imageLibrary["Lake Louise"],
    imageLibrary["Bald Mountains"],
    imageLibrary["Latemar"],
    imageLibrary["Vanoise National Park"],
    imageLibrary["Lago di Braies"],
  ];

  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;
    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    image.src = data.link;
    image.alt = data.alt;
    title.textContent = data.name;

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cardElement.remove();
    });

    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      heartButton.classList.toggle("cards__heart__active");
    });

    image.addEventListener("click", () => {
      modalImage.src = data.link;
      modalImage.alt = data.name;
      modalCaption.textContent = data.name;
      openPopup(imageModal);
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  placeInput.addEventListener("input", () => {
    const placeName = placeInput.value.trim();
    if (imageLibrary[placeName]) {
      linkInput.value = imageLibrary[placeName].link;
    } else {
      linkInput.value = "";
    }
  });

  function openPopup(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");
  }

  function closePopup(modal) {
    modal.classList.remove("modal_open");
    modal.classList.add("modal_hidden");
  }

  closeImageModalButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal);
  });

  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    closePopup(editModal);
  });

  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const placeName = placeInput.value.trim();
    const link = linkInput.value.trim();

    if (!isValidUrl(link)) {
      alert("Please enter a valid URL.");
      return;
    }

    let newPlace;
    if (imageLibrary[placeName]) {
      newPlace = imageLibrary[placeName];
    } else {
      newPlace = {
        name: placeName,
        link: link,
        alt: placeName,
      };
    }

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    placeInput.value = "";
    linkInput.value = "";

    closePopup(addModal);
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
});
