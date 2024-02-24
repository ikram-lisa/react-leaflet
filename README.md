React-Leaflet Interactive Map Application README
Overview
This React application leverages the react-leaflet library to create a dynamic, interactive map. It's designed for users to engage with various markers representing distinct locations, optimized for handling a multitude of markers through clustering. A significant feature is its dynamic data loading based on the map's current viewport, ensuring efficient and relevant data presentation.

Features
Interactive Map: Built using react-leaflet, the app renders a responsive and interactive map.
Custom Markers: Employs leaflet Icons and DivIcons for personalized marker visuals.
Clustering: Integrates useSupercluster for efficient marker clustering, enhancing both performance and user experience.
Dynamic Data Loading: Automatically fetches and displays marker data corresponding to the map's current bounds.
Zoom and Pan Controls: Facilitates map navigation through intuitive zooming and panning capabilities.
Popups: Interactive popups to display location names upon marker interaction.
Installation
Clone the Repository
bash
Copy code
git clone [repository-url]
Install Dependencies
bash
Copy code
npm install
Run the Application
bash
Copy code
npm start
Usage
Navigate across the map using mouse or touch inputs.
Interact with clustered markers to zoom in and access individual markers.
Click on individual markers to reveal popups showcasing the location names.
Configuration
Map Center and Zoom Level: Pre-configured in the config object, adjustable to suit different geographical focuses.

Dependencies
react-leaflet: Renders the map and its elements.
leaflet: Provides core map functionalities and custom marker designs.
useSupercluster: Manages marker clustering.
react, react-dom: Fundamental React dependencies for the application.
API Integration
Station data is retrieved from https://api.irail.be/stations/?format=json&lang=nl. Adjust your CORS policy settings to enable successful API requests.
