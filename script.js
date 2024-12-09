// Location data
const locations = [
    { name: "London", coords: [51.5074, -0.1278], title:"London, United Kindom", date: "October 2, 1872", info: "Took train to egypt.<img src='img/map-london.jpg' height=250 width=250></img> "},
    { name: "Suez", coords: [29.9678, 32.5498], title:"Suez, Egypt", date: "October 9, 1872", info: "Took ship \"Mangolia\" to India.<img src='img/map-suez.jpeg' height=250 width=250></img> " },
    { name: "Bombay", coords: [19.076, 72.8777], title:"Bombay, India", date: "October 20, 1872", info: "Arrived 2 days before schedule. Took the \"Great Indian Peninsula Railway\" to Calcutta.<img src='img/map-bombay.jpg' height=250 width=250></img>" },
    { name: "Allahabad", coords: [25.4358, 81.8463], title:"Allahabad, India", date: "October 22, 1872", info: "No rail line between Allahabad and Banaras. Change of plans to reach Calcutta.<img src='img/map-allahabad.png' height=250 width=250></img>" },
    { name: "Calcutta", coords: [22.5726, 88.3639], title:"Calcutta, India",  date: "October 25, 1872", info: "Lost gain of 2 days. Took ship \"Rangoon\" to Hong kong.<img src='img/map-calcutta.jpg' height=250 width=250></img>" },
    { name: "HongKong", coords: [22.3193, 114.1694], title:"Hong Kong / Shanghai, China", date: "November 7, 1872", info: "Arrived 24 hours late. Took a steamer to Yokahoma via Shanghai.<img src='img/map-HongKong.png' height=250 width=250></img>" },
    { name: "Yokohama", coords: [35.4437, 139.6380], title:"Yokohama, Japan", date: "November 14, 1872", info: "Passepartout reunite with Fogg and Aouda. Take ship to America.<img src='img/map-yokohama.png' height=250 width=250></img>" },
    { name: "SanFrancisco", coords: [37.7749, -122.4194], title:"San Francisco, USA", date: "December 3, 1872", info: "Arrived on schedule. Took \"Pacific Railroad\" to NYC via Omaha.<img src='img/map-sf.jpg' height=250 width=250></img>" },
    { name: "Omaha", coords: [41.255525469397426, -95.8783027761861], title:"Omaha, USA", date: "December 9, 1872", info: "Eventful train and sledge ride.<img src='img/map-Omaha.png' height=250 width=250></img>" },
    { name: "Nyc", coords: [40.7128, -74.0060], title:"New York City, USA", date: "December 12, 1872", info: "The adventure continues - new obstacle to cross the Atlantic.<img src='img/map-nyc.jpg' height=250 width=250></img>" },
    { name: "Liverpool", coords: [53.409115322310925, -3.003058176663919], title:"Liverpool, United Kindom", date: "December 21, 1872", info: "Race back home. Dramatic arrival in Europe.<img src='img/map-Liverpool.jpg' height=250 width=250></img>" }
];

// Custom waypoints for each route
const routes = [
    // London to Suez (via rail and ferry)
    {
        waypoints: [
            [51.5074, -0.1278], // London
            [50.5, 0.0],        // Dover ferry
            [36.1378, 21.5046], // Mediterranean crossing
            [29.9678, 32.5498]  // Suez
        ],
        type: "rail"
    },
    // Suez to Bombay (via steamer)
    {
        waypoints: [
            [29.9678, 32.5498],
            [17.27721899355938, 40.8731205550315],
            [13.80607548357233, 42.630933204525526],
            [15.337167215594006, 60.29694848012667],
            [18.947855794222413, 71.28327638783884],
            [19.076, 72.8777]   // Bombay
        ],
        type: "steamer"
    },
    // Bombay to Allahabad (via rail)
    {
        waypoints: [
            [19.076, 72.8777],
            [21.15, 75.0],      // Midpoint in central India
            [25.4358, 81.8463]  // Allahabad
        ],
        type: "rail"
    },
    // Allahabad to Calcutta (via rail)
    {
        waypoints: [
            [25.4358, 81.8463],
            [22.5726, 88.3639]  // Calcutta
        ],
        type: "rail"
    },
    // Calcutta to Hong Kong (via steamer)
    {
        waypoints: [
            [22.5726, 88.3639], 
            [10.226807822775573, 92.11015740530554],
            [5.160034300785774, 99.08191010137406],
            [0.42394233680149335, 104.45358828452324],
            [6.950001160696423, 105.93937175082056],
            [22.3193, 114.1694] // Hong Kong
        ],
        type: "steamer"
    },
    // Hong Kong to Yokohama (via steamer)
    {
        waypoints: [
            [22.3193, 114.1694], 
            [26.0, 130.0], 
            [35.4437, 139.6380] // Yokohama
        ],
        type: "steamer"
    },
    // Yokohama to San Francisco (via steamer)
    {
        waypoints: [
            [35.4437, 139.6380],
            [45.0, -160.0], 
            [37.7749, -122.4194] // San Francisco
        ],
        type: "steamer"
    },
    // San Francisco to Omaha (via rail)
    {
        waypoints: [
            [37.7749, -122.4194],
            [41.255525469397426, -95.8783027761861] //Omaha
        ],
        type: "rail"
    },
    // Omaha to New York City (via rail)
    {
        waypoints: [
            [41.255525469397426, -95.8783027761861], //Omaha
            [40.7128, -74.0060]  // New York City
        ],
        type: "rail"
    },
    // New York City to London (via steamer)
    {
        waypoints: [
            [40.7128, -74.0060], 
            [53.409115322310925, -3.003058176663919]   // Liverpool
        ],
        type: "steamer"
    }
];


let currentIndex = 0;
let map, marker, routePolylines = [], visitedMarkers = [];

// Create a numbered marker icon
function createNumberedMarkerIcon(number) {
    return L.divIcon({
        className: "numbered-icon",
        html: `<div class="marker-number">${number}</div>`,
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
}

// Initialize map
function initializeMap() {
    map = L.map('map').setView(routes[0].waypoints[0], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    map.panTo([32.96273192047069, 36.42698631463439]);
    // Initialize the marker
    marker = L.marker(routes[0].waypoints[0], {
        icon: createNumberedMarkerIcon(1)
    }).addTo(map);
    visitedMarkers.push(marker);
    updateNavigationButtons(); 
    updateInfoBox();
}

function drawRoute(route) {
    const lineStyle = {
        color: route.type === "rail" ? "blue" : "green",
        weight: 4,
        dashArray: route.type === "steamer" ? "10, 10" : null
    };
    const polyline = L.polyline(route.waypoints, lineStyle).addTo(map);
   
    routePolylines.push(polyline);
}



function navigate(forward) {
    if (forward) {
        if (currentIndex < routes.length) {
            drawRoute(routes[currentIndex]);

            currentIndex++;
            map.panTo(locations[currentIndex].coords);
            if (currentIndex < locations.length) {
                // Update marker to the next location
                //marker.setLatLng(routes[currentIndex - 1].waypoints.slice(-1)[0]);

                // Add a numbered marker for the new location
                const numberedMarker = L.marker(routes[currentIndex - 1].waypoints.slice(-1)[0], {
                    icon: createNumberedMarkerIcon(currentIndex+1)
                }).addTo(map);
                visitedMarkers.push(numberedMarker);

                updateInfoBox();
            }
        }
    } else {
        if (currentIndex > 0) {
            // Remove the last drawn route
            const lastPolyline = routePolylines.pop();
            if (lastPolyline) map.removeLayer(lastPolyline);

            // Remove the last marker
            const lastMarker = visitedMarkers.pop();
            if (lastMarker) map.removeLayer(lastMarker);

            currentIndex--;
            map.panTo(locations[currentIndex].coords);
            if (currentIndex > 0) {
                // Update marker to the previous location
               // marker.setLatLng(routes[currentIndex - 1].waypoints.slice(-1)[0]);

                updateInfoBox();
            } else {
                marker.setLatLng(routes[0].waypoints[0]);
                updateInfoBox();
            }
        }
    }


    updateNavigationButtons();
}



function updateNavigationButtons() {
  const backwardButton = document.getElementById("backward");
  const forwardButton = document.getElementById("forward");

  // Disable the backward button at the beginning of the journey
  backwardButton.disabled = currentIndex === 0;
  
  backwardButton.style.opacity = backwardButton.disabled ? "0.5" : "1.0";
  backwardButton.style.cursor = backwardButton.disabled ? "not-allowed" : "pointer";

  // Disable the forward button at the end of the journey
  forwardButton.disabled = currentIndex === locations.length - 1;
 
  forwardButton.style.opacity = forwardButton.disabled ? "0.5" : "1.0";
  forwardButton.style.cursor = forwardButton.disabled ? "not-allowed" : "pointer";
}

// Navbar navigation
document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("data-target");

      // Hide all sections
      document.querySelectorAll(".section").forEach(section => {
          section.classList.remove("active");
      });

      // Show the target section
      document.getElementById(target).classList.add("active");

      // Reinitialize map if switching to timeline
      if (target === "timeline") {
          map.invalidateSize(); // Ensures the map renders correctly
      }
  });
});

document.getElementById("forward").addEventListener("click", () => navigate(true));
document.getElementById("backward").addEventListener("click", () => navigate(false));

// Initialize map on page load
initializeMap();

let currentSlide = 0; // Track the current slide
let currentImages = []; // Store the current images array

// Detailed information for each location
const details = {
    London: {
        images: [
            { src: "img/london2.png", text: "<ul><li>Phileas Fogg is a wealthy man who lives a solitary life in London. </li><li>He hires a Frenchman Jean Passepartout as his new servant.</li><li>Passepartout calls Fogg “Exactitude personified” as Fogg carries out his daily routines with mathematical precision. </li><li>Fogg is aware of the opening of the new railway section in India and makes a bet with other club members that he can travel around the world in 80 days, wagering £20,000, half of his fortune.</li><li>On the same night of 2 October 1872, he and Passepartout depart on their journey.</li></ul>" }
        ]
    },
    Suez: {
        images: [
            { src: "img/Suez1.jpg", text: "<ul><li>Detective Fix of Scotland Yard intercepts Fogg whom he believes is a bank robber. This sets up the central conflict of the story – Fogg's race against time versus Fix's relentless pursuit.</li><li>Fix tries to influence the local counsel to withhold Fogg's passport, but his plan fails.</li><li>Fogg meticulously tracks time and ensures the passports are stamped.</li></ul>" }
        ]
    },
    Bombay: {
        images: [
            { src: "img/bombay1.png", text: "<ul><li>Passepartout's visit to a Hindu temple wearing shoes causes a huge commotion.</li><li>Fix sees this as an opportunity to get Passepartout arrested to hold Fogg in India while he waits for the arrest warrant.</li></ul>" }
        ]
    },
    Allahabad: {
        images: [
            { src: "img/allahabad1.png", text: "<ul><li>Sir Francis Cromarty, a brigadier general, educates Fogg about Indian society and customs.</li><li>Fogg purchases an elephant to traverse a region where the railway is incomplete, showing his calm and calculative traits. </li><li>The group encounters a sati ritual and rescues Aouda, an innocent young woman, from getting sacrificed, showing the group's heroic and human traits.</li><li>Fogg rewards the guide by giving away the elephant, showing his generosity.</li> <li>They then take the train from Banaras to Calcutta.</li></ul>" }
        ]
    },
    Calcutta: {
        images: [
            { src: "img/calcutta1.png", text: "<ul><li>Fogg and Passepartout are arrested for the crime Passepartout had committed in Bombay.</li><li>Fogg posts bail and boards a ship to Hong Kong along with Passepartout and Aouda. </li><li>Fix follows them and boards the same ship.</li></ul> " }
        ]
    },
    HongKong: {
        images: [
            { src: "img/hongkong1.png", text: "<ul><li>Aouda's relatives cannot be found, so Fogg decides to take her with them to Europe.</li><li>Fix drugs Passepartout and he gets separated from Fogg.</li><li>Fog search for Passepartout and miss \"Carnatic\".</li><li>Fog uses his quick thinking and offers a handsome reward to the  captain of another boat, the \"Tankadere\", to take him, Auoda, and Fix to Shanghai.</li><li>On their way to Shanghai, Fogg pushes the captain to keep sailing despite the bad weather.</li><li>Fogg's intelligent move to fire distress signals allowed them to board another ship from Shanghai to Yokohama.</li></ul>" }
        ]
    },
    Yokohama: {
        images: [
            { src: "img/yokohama1.png", text: "<ul><li>Passepartout, who is out of money, joins a circus on the strength of his past acrobatic abilities.</li><li>Fogg and Aouda find Passepartout working at the circus and reunite.</li><li>Fogg and Aouda get closer together. Aouda finds comfort and warmth in Fogg’s presence.</li><li>They all depart for San Francisco on the \”General Grant\”.</li></ul>" }
        ]
    },
    SanFrancisco: {
        images: [
            { src: "img/sf1.png", text: "<ul><li>There is a brawl at a political rally in San Francisco.</li><li>Fogg has a scuffle with Colonel Proctor who tries to hit Fogg, but Fix intervenes and takes the hit.</li><li>Fogg pledges to return to America, find the Colonel, and take his revenge. This shows the importance of honor for Fogg.</li><li>Fix finally gets the arrest warrant. He changes his game and decides to help Fogg by any means possible to help him reach England and arrest Fogg.</li></ul>" }
        ]
    },
    Omaha: {
        images: [
            { src: "img/Omaha1.png", text: "<ul><li>Fogg and his companions board the Pacific Railroad, embarking on an adventurous journey across the American West.</li><li>A massive herd of buffalo causes a delay in their train journey. The train crosses a withering suspension bridge. The bridge collapses after the train crosses the bridge.</li><li>Sioux Indians attack the train and capture Passepartout. Fogg displays remarkable courage by organizing a rescue party showcasing his loyalty to Passepartout despite potential delays to his journey.</li><li>Fogg hires a sledge to continue their journey across the frozen plains which demonstrates Fogg's determination to overcome any obstacle.</li></ul>" }
        ]
    },
    Nyc: {
        images: [
            { src: "img/nyc1.png", text: "<ul><li>The group takes a train from Omaha to Chicago and from Chicago to New York City.</li><li>They miss the direct steamer from NYC to Liverpool.</li><li>Fogg hires Captain Speedy and his small cargo vessel \"Henrietta\" destined for Bordeaux.</li></ul>" }
        ]
    },
    Liverpool: {
        images: [
            { src: "img/Liverpool1.png", text: "<ul><li>Fogg imprisons and locks the captain of the \"Henrietta\" and takes command of the ship himself. He redirects the ship to England. This demonstrates his determination to reach England at any cost.<li>Facing dwindling coal supplies, Fogg buys the ship and burns parts of its structure to fuel the engine. Fogg manages to quell the unrest and maintain control of the crew, showcasing his courage and ability to command respect.</li><li>Fogg manages to navigate the \"Henrietta\" to Queenstown in Ireland and take a train to Liverpool.</li><li>Upon finally reaching Liverpool, Fogg gets arrested by Detective Fix.</li></ul>" }
        ]
    },
    // Add similar objects for other locations...
};

// Update info box
function updateInfoBox() {
    const infoBox = document.getElementById("info-box");
    const { name, title, date, info } = locations[currentIndex];
    infoBox.style.display = "block";
    infoBox.innerHTML = `<strong><a href="#" onclick="openOverlay('${name}','${title}')">${title}</a></strong><br><i>${date}</i><br>${info}`;
}

function openOverlay(city, title) {
  const overlay = document.getElementById("overlay");
  const dimBackground = document.getElementById("dim-background");
  const overlayTitle = document.querySelector(".overlay-header");
  const overlayText = document.querySelector(".overlay-text");
  const overlayImages = document.querySelector(".overlay-images");

  // Set overlay content
  overlayTitle.textContent = title;

  // Initialize slideshow
  currentImages = details[city].images; // Set global images array
  currentSlide = 0; // Reset slide index
  updateSlideshow(overlayImages, overlayText);

  // Show overlay and dim background
  overlay.classList.remove("hidden");
  dimBackground.classList.remove("hidden");
  dimBackground.classList.add("active"); // Add active class to show the dim background
}

document.getElementById("close-overlay").addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  const dimBackground = document.getElementById("dim-background");

  // Hide overlay and dim background
  overlay.classList.add("hidden");
  dimBackground.classList.remove("active"); // Remove active class to hide the dim background
});




// Update slideshow
function updateSlideshow(overlayImages, overlayText) {
    overlayImages.innerHTML = `
        <button class="overlay-arrows arrow-left" onclick="changeSlide(-1)" id="arrow-left">&lt;</button>
        <img src="${currentImages[currentSlide].src}" alt="Slide ${currentSlide + 1}">
        <button class="overlay-arrows arrow-right" onclick="changeSlide(1)" id="arrow-right">&gt;</button>
    `;
    overlayText.innerHTML = currentImages[currentSlide].text; // Update text for the current slide
    updateArrowState(); // Update arrow state based on slide position
}

// Change slide
function changeSlide(direction) {
    currentSlide = (currentSlide + direction + currentImages.length) % currentImages.length;
    const overlayImages = document.querySelector(".overlay-images img");
    const overlayText = document.querySelector(".overlay-text");

    overlayImages.src = currentImages[currentSlide].src; // Update image
    overlayText.innerHTML = currentImages[currentSlide].text; // Update text
    updateArrowState(); // Update arrow state after changing slide
}

// Update arrow button state
function updateArrowState() {
    const leftArrow = document.getElementById("arrow-left");
    const rightArrow = document.getElementById("arrow-right");

    leftArrow.disabled = currentSlide === 0; // Disable if on the first slide
        currentSlide > 0 ? leftArrow.style.backgroundColor="#0056b3":'';
    rightArrow.disabled = currentSlide === currentImages.length - 1; // Disable if on the last slide
        currentSlide < currentImages.length - 1 ? rightArrow.style.backgroundColor="#0056b3":'';

    // Optional: Style disabled buttons
    leftArrow.style.opacity = leftArrow.disabled ? "0.5" : "1.0";
    rightArrow.style.opacity = rightArrow.disabled ? "0.5" : "1.0";
    leftArrow.style.cursor = leftArrow.disabled ? "not-allowed" : "pointer";
    rightArrow.style.cursor = rightArrow.disabled ? "not-allowed" : "pointer";
}

// Close overlay
document.getElementById("close-overlay").addEventListener("click", () => {
    document.getElementById("overlay").classList.add("hidden");
});



