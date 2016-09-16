# otter-spotter

This is a bare-bones application using Node.js, Express, sqlite, jquery, and Mapbox-gl.

###Start-up
After cloning the repo and navigating to the project directory, be sure to `npm install` before starting the web service locally. Then run `node server.js` to start the web service.

###Database
This application uses a client-side embedded database contained in a file (the otterspotter.db file) - there is no client-server database engine.

You will likely need to `npm install -g sqlite3` (assuming Node is already install on your machine) to create new database tables, and use sql commands to view and update the data using the terminal. 

The `dummy_lat_lng` table contains id, lat, and lng columns to model possible otter sighting locations. To view data in the table, run the following in your terminal:  
`sqlite3`  
`.open otterspotter.db`  
`select * from dummy_lat_lng`  

###API
The `/points` endpoint queries all points in the database, and sends a response with those points as an array.

###Front-end
In the map.js file, jquery is used to add a click event to the 'Get All Points' button. 

On click, the app function makes a GET request to the API, which returns an array of all points points in the table. The function converts all of these points to one geojson object.

Mapbox-gl methods are then used to draw the geojson on the map, and add popups to each point.

