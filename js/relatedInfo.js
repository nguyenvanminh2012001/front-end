const inputNamePet = document.querySelector(".inputNamePet")
const inputTypePet = document.querySelector(".inputTypePet")
const inputColorPet = document.querySelector(".inputColorPet")
const inputHobbyPet = document.querySelector(".inputHobbyPet")
const note = document.querySelector(".note")
const siteBtn = document.querySelector(".site-btn")
const infoPet__input__warning = document.querySelector(".infoPet__input__warning")

function submitInfoPet() {
    if (!inputNamePet.value || !inputTypePet.value || !inputColorPet.value ||
        !inputHobbyPet.value || !note.value) {
        infoPet__input__warning.classList.add("on")
    }
    else {
        inputNamePet.value = ""
        inputTypePet.value = ""
        inputColorPet.value = ""
        inputHobbyPet.value = ""
        note.value = ""
        window.location.href = "index.html"
    }
}