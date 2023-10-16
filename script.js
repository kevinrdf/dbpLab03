const apiUrl = "https://superheroapi.com/api/1045382766480673";

let currentCharacterId = 1;

function fetchCharacter() {
    fetch(`${apiUrl}/${currentCharacterId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo obtener la información del personaje.");
            }
            return response.json();
        })
        .then(data => {
            const characterInfo = document.getElementById("character-info");
            characterInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p>Inteligencia: ${data.powerstats.intelligence}</p>
                <p>Lugar de nacimiento: ${data.biography["place-of-birth"]}</p>
                <p>Ocupación: ${data.work.occupation}</p>
            `;

            const characterImage = document.getElementById("character-image");
            characterImage.innerHTML = `<img src="${data.image.url}" alt="${data.name}">`;
        })
        .catch(error => {
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = error.message;
        });
}

document.getElementById("next-button").addEventListener("click", () => {
    if (currentCharacterId < 731) {
        currentCharacterId++;
        fetchCharacter();
    }
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentCharacterId > 1) {
        currentCharacterId--;
        fetchCharacter();
    }
});

// Cargar el primer personaje al cargar la página
fetchCharacter();
