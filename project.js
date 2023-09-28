const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//UI start



//event listeners

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);

    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if ( title === "" || director === "" || url === ""){
        //error
        UI.displayMessages("Please fill input fields...", "danger");
    } 
    else {
        const newFilm = new Film(title,director,url);
        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.displayMessages("Movie added succesfully!","success");
    }
    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-film"){
        UI.deleteFilmfromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Successfully removed!","success");
    }
}
function clearAllFilms(){

    if(confirm("Are you sure?")){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}}