var searchInput = document.querySelector('.searchInput input');
var searchBtn = document.querySelector('#searchBtn');
var toDay = document.querySelector('.toDay');
var afterdays = document.querySelector('.afterdays');

var myIcon;
var baseUrl = `https://api.weatherapi.com/v1`;
var apiKey = `2f14fb19381f4ed79d5100616241912`;
var myData;

var days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
var months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

(function(){
   var success = (pos)=>{
      const  lat = pos.coords.latitude;
      const  lon = pos.coords.longitude;
      const coords = lat + `,` + lon;
      getUrl(coords);
   }
   var error = (err)=>{
      console.log('User blocked location');
   }
   navigator.geolocation.getCurrentPosition(success , error);
})();
async function getUrl(coords) {
   try{
      var myRequest = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${coords}&days=3`);
      myData = await myRequest.json();
      displayToday(myData);
      displayAfterDays(myData);
   }catch{
      console.log('Error');
   }
}
searchBtn.addEventListener('click' , function(){
   getUrl(searchInput.value)
});
searchInput.addEventListener('keydown' , function(e){
   if(e.key == 'Enter'){
      getUrl(searchInput.value);
   }
});
function displayToday(myData) {
   var cartona = ``;
   myIcon = (myData.current.condition.icon).split('').slice(2).join('');
   var myDate = new Date(myData.forecast.forecastday[0].date);
   var day = myDate.getDay();
   var date = myDate.getDate();
   var month = myDate.getMonth();
   cartona = `
      <div class="card-header rounded-0 p-2 d-flex justify-content-between align-items-center">
         <div class="day">${days[day]}</div>
         <div class="date">${date} ${months[month]}</div>
      </div>
      <div class="card-body py-4 text-start">
         <div id="city" class="mb-3">${myData.location.name}</div>
         <div id="currentTemp">${myData.current.temp_c}°C</div>
         <img id="icon" alt="" src="${myIcon}">
         <div id="condition">${myData.current.condition.text}</div>
         <div class="d-flex align-items-center justify-content-start pt-3">
         <div class="pe-5 ps-3">
               <img src="images/icon-umberella.png" alt="icon-umberella">
               <span id="humidity">${myData.current.humidity}%</span>
         </div>
         <div class="pe-5 ps-3">
               <img src="images/icon-wind.png" alt="icon-wind">
               <span id="windSpeed">${myData.current.wind_kph}Km/h</span>
         </div>
         <div class="pe-5 ps-3">
               <img src="images/icon-compass.png" alt="icon-compass">
               <span id="windDirection">${myData.current.wind_dir}</span>
         </div>
         </div>
      </div>
   `;
   toDay.innerHTML = cartona;
};
function displayAfterDays(myData){
   var cartona2 = ``;
   for(var i = 1; i < 3; i++){
      var myDate2 = new Date(myData.forecast.forecastday[i].date);
      var day2 = myDate2.getDay();
      var myIcon2 = (myData.forecast.forecastday[i].day.condition.icon).split('').slice(2).join('');
      cartona2 += `
      <div class="tomorrow col card mb-md-3 rounded-0 border-0" >
         <div class="card-header rounded-0 text-center p-2">${days[day2]}</div>
            
         <div class="card-body text-center p-5">
            <img id="icon" alt="" src="${myIcon2}">
            <div class="maxTemp text-white fs-3">${myData.forecast.forecastday[i].day.maxtemp_c}°C</div>
            <div class="minTemp mb-3 mt-0">${myData.forecast.forecastday[i].day.mintemp_c}°</div>
            <div class="cond">${myData.forecast.forecastday[i].day.condition.text}</div>
         </div>
      </div>
   `;
   }
   afterdays.innerHTML += cartona2;
}
