let totaltime = 0;
let sunElement;
// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = '0' + date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp (gebruiken we nu niet)
  // const seconds = '0' + date.getSeconds();

  // Will display time in 10:30(:23) format
  return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

const updateTimeAndTimeLeft = (timeLeftTimeStamp) => {
  document.querySelector('.js-sun').dataset.time =
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  document.querySelector('.js-time-left').innerText = timeLeftTimeStamp;
};

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (sunrise) => {
	const now = new Date()
	const sunriseDate = new Date(sunrise * 1000)

	const minutesleft = now.getHours() * 60 + now.getMinutes() - (sunriseDate.getHours() * 60 + sunriseDate.getMinutes());
	console.log({totaltime}, {minutesleft})
	const percentage = (totaltime / 100) * minutesleft;

	const sunLeftPosition = percentage
	const sunBottomPosition = percentage > 50 ? 100 -percentage : percentage * 2
  // In de functie moeten we eerst wat zaken ophalen en berekenen.
  // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
  // Bepaal het aantal minuten dat de zon al op is.
  // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
  // We voegen ook de 'is-loaded' class toe aan de body-tag.
  // Vergeet niet om het resterende aantal minuten in te vullen.
  // Nu maken we een functie die de zon elke minuut zal updaten
  // Bekijk of de zon niet nog onder of reeds onder is
  // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
  // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  document.querySelector('.js-location').innerText =
    queryResponse.name + ', ' + queryResponse.country;
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  document.querySelector('.js-sunrise').innerText =
    _parseMillisecondsIntoReadableTime(queryResponse.sunrise);
  document.querySelector('.js-sunset').innerText =
    _parseMillisecondsIntoReadableTime(queryResponse.sunset);
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
  const data = await getData(getEndpoint(lat, lon));
  console.log(data);
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  // Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener('DOMContentLoaded', async function () {
  // 1 We will query the API with longitude and latitude.
  const lat = 50.8027841;
  const lon = 3.2097454;
  const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1d029ea3bdc0b283bb75fc891265ee53&units=metric&lang=nl&cnt=1`;
  const { city } = await getData(endpoint);
  console.log(city);
  showResult(city);
  updateTimeAndTimeLeft(
    _parseMillisecondsIntoReadableTime(city.sunset - city.sunrise)
  );
  totaltime = 
  	new Date(city.sunset - city.sunrise * 1000).getHours() * 60 +
	new Date(city.sunset - city.sunrise * 1000).getMinutes();
  updateTimeAndTimeLeft()
  placeSunAndStartMoving(city.sunrise)
});
