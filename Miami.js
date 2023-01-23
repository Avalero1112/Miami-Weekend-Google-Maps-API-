//const { response } = require("express");

function initMap() {    
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    //map options
    var options= {
        zoom: 12,
        center: {lat:25.7617, lng:-80.1918},
        mapId: google.maps.MapTypeId.ROADMAP
    }
    //Miami map
    var map = new 
    google.maps.Map(document.getElementById('map'),options);
    directionsRenderer.setMap(map);

    //autocomplete
    var autocomplete = new 
    google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    const input = document.getElementById("autocomplete");

    const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    let clubArr = [];
    let barArr = [];
    let resturantArr = [];
    let userLat;
    let userLng;
    let userCoords = [];
    let cheapPlaces = [];
    let allPlaces = [];


    var placeDetails = document.getElementById('placeDetails');
    placeDetails.style.display = 'none';

    console.log("hi there");

    function createMarker (props) {
         var marker = new google.maps.Marker({
            position: props.coords,
            type: props.type,
        })

        const allLats = props.coords.lat;
        const allLngs = props.coords.lng



        marker.setMap(map);

        if (marker.type === 'club') {
            clubArr.push(marker);
        } else if (marker.type === 'Bar') {
            barArr.push(marker);
        } else if (marker.type === 'Resturant') {
            resturantArr.push(marker);
        }
        
      
        const infowindowContent = document.getElementById("infowindow-content");

        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                //content:props.content

            });
            //var infoDiv = document.createElement("div");
            //infoDiv.innerHTML = infoWindow;
        }

        marker.addListener("click", function() {

        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();

        geocoder.geocode({'location': {lat: lat, lng: lng}}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
        var placeID = results[1].formatted_address;
        destination.value = results[1].formatted_address;
        const request = {
            placeId:props.placeID,
            fields: ['name','formatted_address','opening_hours',
            'price_level','user_ratings_total','formatted_phone_number','website','price_level','reviews','rating']
        }
        //not displaying everything properly because coordinates are off
        var service = new google.maps.places.PlacesService(map);
        var that = this;

        service.getDetails(request, function(place, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
        
        var starRating;
        if (place.rating >= 3.8 && place.rating <= 4.2) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>`;
        } else if (place.rating <= 4.7 && place.rating >= 4.3) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star-half"></i>`;
        } else if (place.rating >= 3.3 && place.rating <= 3.7) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star-half"></i>`;
        } else if (place.rating >= 2.8 && place.rating <= 3.2) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>`;
        } else if (place.rating >= 2.3 && place.rating <= 2.7) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star-half"></i>`;
        } else if (place.rating >= 1.8 && place.rating <= 2.2) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star"></i>`;
        } else if (place.rating >= 1.3 && place.rating <= 1.7) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>
            <i class="fa fa-solid fa-star-half"></i>`;
        } else if (place.rating >= 0.8 && place.rating <= 1.2) {
            starRating = 
            `<i class="fa fa-solid fa-star"></i>`;
        } else if (place.rating >= 0.3 && place.rating <= 0.7) {
            starRating = 
            `<i class="fa fa-solid fa-star-half"></i>`;
        } else if (place.rating < 0.3) {
            starRating =
            `<i class="fa fa-solid fa-thumbs-down"></i>`;
        } else {
            starRating =
            `<i class="far fa-regular fa-star"></i>
            <i class="far fa-regular fa-star"></i>
            <i class="far fa-regular fa-star"></i>
            <i class="far fa-regular fa-star"></i>
            <i class="far fa-regular fa-star"></i>`;
        }

        var priceLevel;
        if (place.price_level === 1) {
            priceLevel = '<i class="fa fa-solid fa-dollar-sign"></i>';
        } else if (place.price_level === 2) {
            priceLevel = '<i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i>';
        } else if (place.price_level === 3) {
            priceLevel = '<i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i>';
        } else if (place.price_level === 4) {
            priceLevel = '<i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i><i class="fa fa-solid fa-dollar-sign"></i>';
        } else {
            priceLevel = '';
        }

        infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '<br>' +
        priceLevel + '<br>' + `<a href=${place.website}>${place.website}</a>` + '<br>' + starRating + '</div>');
        infoWindow.open(map, that);

        const placeInfo = document.getElementById('placeInfo');
        placeInfo.innerHTML = '<div><strong><h1>' + place.name + '</h1></strong>' + '<br>'  + starRating +`  `+ place.rating
         + ' | ' + priceLevel + '<br>' + `<i>${place.formatted_address}</i>` + ' | ' + place.formatted_phone_number + '<hr>'
        + `<i>${place.opening_hours.weekday_text[4]}</i>` + '<br>'
        + `<i>${place.opening_hours.weekday_text[5]}</i>`  + '<br>'
        + `<i>${place.opening_hours.weekday_text[6]}</i>` 
        + '<hr>' + `<div class="reviews">` + 
        place.reviews[0].text + '         -' + ' ' + place.reviews[0].author_name + `         | <strong>Rating: ${place.reviews[0].rating}/5
        </strong>`+ '<br>'+'<br>' + 
        place.reviews[1].text + '         -' + ' ' + place.reviews[1].author_name + `         | <strong>Rating: ${place.reviews[1].rating}/5
        </strong>` + '<br>'+'<br>' +
        place.reviews[2].text + '         -' + ' ' + place.reviews[2].author_name + `         | <strong>Rating: ${place.reviews[2].rating}/5
        </strong>` + '<br>' + '<br>' + `</div>` + '</div>'

        const gallery = document.getElementById("gallery");
            const str = place.name;
            const str2 = str.replace(/<[^>]*>?/gm, '');
            infoWindow.open(map, marker);

            const img = document.createElement("img");
            const placeNames = document.getElementById("place");
            placeNames.innerHTML = place.name;

            let venues = [];
            venues.push(str2);

            if (venues.includes(str2)) {
            
                img.src = `${str2}1.jpg`;

            gallery.appendChild(img);
        
            img.classList.add("galleryImg");

           

            if (gallery.childNodes.length > 2) {

            const prevVenue1 = gallery.firstElementChild;
            //const prevVenue2 = gallery.firstElementChild.nextElementSibling;

            gallery.removeChild(prevVenue1);
            //gallery.removeChild(prevVenue2);
            }

            }
        }})

        }
        } 
        })
        placeDetails.style.display = 'flex';
        const exitBtn = document.getElementById('X');

        exitBtn.addEventListener("click", function () {
            placeDetails.style.display = 'none';
        }, {passive: true});

        map.addListener("click", function () {
            placeDetails.style.display = 'none';
        }, {passive: true});

        }, {passive: true})
    }
    

    let geocoder = new google.maps.Geocoder();
    const submitButton = document.getElementById('submit');
    const inputText = document.getElementById('autocomplete');

    let userLocation = new google.maps.Marker({
        map,
        icon:image,
      });

    function geocode(request) {

        const userPlaceID = new google.maps.places.Autocomplete(input, {
            fields: ["place_id"],
          });
        const user = userPlaceID.getPlace();

        geocoder
          .geocode(request)
          .then((result) => {
            const { results } = result;
      
            map.setCenter(results[0].geometry.location);
            userLocation.setPosition(results[0].geometry.location);
            userLocation.setMap(map);
            userLat = userLocation.getPosition().lat();
            userLng = userLocation.getPosition().lng();
            userCoords.push({'location': {lat: userLat, lng: userLng}});
            //responseDiv.style.display = "block";
            //response.innerText = JSON.stringify(result, null, 2);
            return results;
          })
      }

      const destination = document.getElementById('destination');
      const venue = destination.value;

      submitButton.addEventListener("click", function() {
      geocode({ address: inputText.value })

      console.log(inputText.value)
      console.log(destination.value)

    })
    
    

    //Directions render object that we'll use to display route 
    //Bind the route to the map
 
    var routeButton = document.getElementById("routeButton");
    routeButton.addEventListener("click", function() {

        calcRoute();
    })

    function calcRoute() {

      directionsService.route({
              origin: `${inputText.value}`,
              destination: `${destination.value}`,
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.IMPERIAL ,
              avoidHighways: false
      },
          (response, status) => {
              console.log(response);
              console.log(status);
          }
      );
       
        var request = {
            origin: `${inputText.value}`,
            destination: `${destination.value}`,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL ,
            avoidHighways: false
        };
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(result);
          }
        });
      }    




var clubsInfo = [
    //BRICKELL VENUES 
    {type: "club", coords: {lat:25.766717, lng:-80.195185},                content:`<h4>Blackbird</h4>`, placeID: `ChIJsRbg74S22YgRi0Phf5bJduk`, }, 
    {type: "club", coords:{lat:25.772362, lng:-80.199755},                 content:`<h4>The Wharf</h4>`, placeID:`ChIJl41ZjJC22YgRqNY20-g5Dgk`},
    {type: "club", coords:{lat:25.784673, lng:-80.193202}, content:`<p>SPACE</p>`, placeID:`ChIJK69z3qO22YgROBJC2vDIXAI`},
    //WYNWOOD VENUES
    {type: "club", coords:{lat:25.799734, lng:-80.197861},content:`<p>Racket</p>`, placeID: `ChIJ5YI87a222YgRNNZQBDWpROk`},
    {type: "club", coords:{lat:25.799685,lng:-80.197946}, content:`<p>Pilo's Tequila Garden</p>`, placeID: `ChIJYwDpeEK32YgRqSThB9zzIcM`},
    {type: "club", coords:{lat:25.800163,lng:-80.198137}, content:`<p>The Dirty Rabbit</p>`, placeID: `ChIJVVUljK222YgRfk4WrTxfZgM`},
    {type: "club", coords:{lat:25.79964, lng:-80.201466},                content:`<p>SHOTS Miami</p>`, placeID: `ChIJSQFrM7K22YgRNk_y_nLOWjA`},
    {type: "club", coords:{lat:25.799621,lng:-80.201077}, content:`<p>Booze Garden</p>`, placeID: `ChIJC1lRwAi32YgRSVrpQlyMnpA`},
    //MIAMI BEACH VENUES
    {type: "club", coords:{lat:25.817837,lng:-80.122712},  content:`<p>LIV</p>`, placeID: `ChIJoWHkOGqz2YgRFI7KBOyVT80`},
    {type: "club", coords:{lat:25.788689, lng:-80.141624},content:`<p>Bodega Taqueria y tequila (South Beach)</p>`, placeID: `ChIJ812ECoi02YgRNjj8YJ8We_c`},
    {type: "club", coords:{lat:25.770553,lng:-80.134042}, content:`<p>STORY</p>`, placeID: `ChIJQRnDgPG02YgR3phRlM77m0U`},
    {type: "club", coords:{lat:25.789319,lng:-80.132295}, content:`<p>Do Not Sit On The Furniture</p>`, placeID: `ChIJs2kjEG-ZEhQRB-lCHptoMwY`},
    {type: "club", coords:{lat:25.79912, lng:-80.129439},content:`<p>Treehouse</p>`, placeID: `ChIJVeGMe5202YgRsKp9L9sZ_Tk`},
    {type: "club", coords:{lat:25.798885,lng:-80.128813}, content:`<p>23 Club</p>`, placeID: `ChIJMwK3zwe12YgRZ2t9YLdYGLc`},
    {type: "club", coords:{lat:25.779744,lng:-80.130985}, content:`<p>VooDoo</p>`, placeID: `ChIJCYXEZJK02YgRjfXK2PimCj4`},
    //COCONUT GROVE VENUES 
    {type: "club", coords:{lat:25.727539, lng:-80.242675}, content:`<p>Bodega Taqueria y tequila (Coconut Grove)</p>`, placeID: `ChIJRSnlieu32YgReeUjNmiGMwY`},
];

var resturantsInfo = [
    {type: "Resturant", coords:{lat:25.765616, lng:-80.190062}, content:`<p>Komodo</p>`, placeID: `ChIJd6C8AYO22YgRYuO-L2IUdDQ`},
    {type: "Resturant", coords:{lat:25.767947 ,lng:-80.196276}, content:`<p>American Social</p>`, placeID: `ChIJ8XrxI4W22YgRyZiuIp0HdhQ`},
    {type: "Resturant", coords:{lat:25.79647,lng:-80.198694},   content: `<p>House of Mac</p>`, placeID: `ChIJZYnZCrS22YgRyDDD0Kg7d4I`},
    {type: "Resturant", coords:{lat:25.766205,lng:-80.192791},  content: `<p>Gekko</p>`, placeID: `ChIJv5H-Hx632YgRm-dxQpAYNeg`}
];

var barsInfo = [
    {type: "Bar", coords:{lat:25.766851, lng:-80.196131}, content:`<p>Rosa Sky</p>`, placeID: `ChIJpwznMWi32YgRs_iFE7Vok3Y`},
    {type: "Bar", coords:{lat:25.764321, lng:-80.194223}, content:`<p>RedBar</p>`, placeID:`ChIJlwXLFIS22YgRn-dgC8QC2us`},
    {type: "Bar", coords:{lat:25.763323, lng:-80.194593}, content:`<p>Sweet Karoline Kareoke Bar</p>`, placeID: `ChIJQyFB81W32YgRckbC3DMrIzc`},
    {type: "Bar", coords:{lat:25.768441,lng:-80.191166},  content:`<p>Better Days</p>`, placeID: `ChIJ0-RuM4O22YgRHcs-acMSQaQ`},
];

const filters = document.getElementById("filtersList");
console.log(filters.lastElementChild.textContent);

function toggleClubs (value) {
    for (let i = 0; i < clubsInfo.length; i++) {
        clubArr[i].setMap(value);
    }
}
function toggleBars (value) {
    for (let i = 0; i < barsInfo.length; i++) {
        barArr[i].setMap(value);
    }
}
function toggleResturants (value) {
    for (let i = 0; i < resturantsInfo.length; i++) {
        resturantArr[i].setMap(value);
    }
}

    //loop through and add nightclub markers
    for (let i = 0; i < clubsInfo.length; i++) {
    createMarker(clubsInfo[i]);
    }
    //shows only clubs
    filters.firstElementChild.addEventListener("click", function () {
           
        filters.firstElementChild.classList.toggle("selected");

        if (filters.firstElementChild.classList.contains("selected")) {
        toggleBars(null);
        toggleResturants(null);
        } else {
            toggleBars(map)
            toggleResturants(map)
        }

     })


    //loop through and add resturant markers
    for (let i = 0; i < resturantsInfo.length; i++) {
    createMarker(resturantsInfo[i]);
}

}







