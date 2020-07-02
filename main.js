

let searchBox = document.querySelector(".search-box");
let città = document.querySelector(".city");
let data = document.querySelector(".date");
let temperatura = document.querySelector(".temperature");
let stato = document.querySelector(".status");
let media = document.querySelector(".temp-media")



let dataCorrente = new Date();

let giorni = ['Lunedi','martedi', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
let mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

window.onload = (event) => {
    if("geolocation" in navigator)
        navigator.geolocation.getCurrentPosition(cercaConCoordinate);
    if(città.textContent == '')    
        cercaConNome("roma");
  };


searchBox.addEventListener('keypress', cerca);

function cerca(evt){
    if(evt.keyCode == 13)
        cercaConNome(searchBox.value)

}

function cercaConCoordinate(posizione){
    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=f9ea2f0e2ab51501e8966454dca92219&lang=it&units=metric&lat=${posizione.coords.latitude}&lon=${posizione.coords.longitude}`)
    .then(res => res.json())
    .then(d => scriviParametri(d))
}


function cercaConNome(nomeCittà){
    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=f9ea2f0e2ab51501e8966454dca92219&lang=it&units=metric&q=${nomeCittà}`)
    .then(res => res.json())
    .then(d => scriviParametri(d))
    
}

function scriviParametri(d){
    if(d.cod == '200'){
        città.textContent = `${d.name}`;
        data.textContent = `${giorni[dataCorrente.getDay()-1]} ${dataCorrente.getDate()} ${mesi[dataCorrente.getMonth()]} ${dataCorrente.getFullYear()}`;
        temperatura.textContent = parseInt(d.main.temp) + '°C';
        stato.textContent = d.weather[0].description;
        media.textContent = `${parseInt(d.main.temp_min) + '°C'} / ${parseInt(d.main.temp_max) + '°C'}`
    }
    else
        alert('Città non presente');
}

