# Street View Tourist API Server

## Table of Contents  
* **[About](#about)**  
  * [Installation](#installation)  
  * [Live Deployment](#live-deployment)  
  * [Technology Used](#technology-used)  
* **[Project Code](#project-code)**  
  * [File Structure](#file-structure)
  * [Models](#models)  
    * [Category](#category)  
    * [Comment](#comment)  
    * [Country](#country)  
    * [Location](#location)  
    * [User](#user)
  * [Controllers](#controllers)  
    * [Auth](#auth)  
    * [Categories](#categories)  
    * [Comments](#comments)  
    * [Countries](#countries)  
    * [Favorites](#favorites)  
    * [Info](#info)  
    * [Location](#locations)
  * [Middleware](#middleware)  
    * [Authentication](#authentication)  
* **[About Me](#about-me)**

## About
The Street View Tourist is a full stack project I made which aims to give the user a virtual tourist experience through being able to explore the various Google Street Views of famous landmarks and locations of the world.

This repository contains the back-end code for the website, including all database models, route controllers, middleware, and more. The starting point for the URI is at https://streetviewtourist.com/api/street_view/, or http://localhost:3010/ if running it locally.

### Installation
To install, run:

`npm install`

To run the server (default port 3001):

`node index.js`

or you may run the server with a daemon or process manager such as nodemon, forever, or pm2.

### Live Deployment
Some GET calls are publically available to use from the live website. See the [controllers](#controllers) for further details.

### Technology Used
The following are some of the various frameworks and libraries used to create this application:
* Express server framework 
* MongoDB for the database
* Mongoose for MongoDB object modeling
* Passport middleware for local and JSON web token authentication
* bcrypt for password hashing

## Project Code

### File Structure
```
├── config/
|   ├── Passport and JWT configuration
├── controllers/
|   ├── Router request handling to individual action controllers
├── middleware/
│   ├── Middleware directory for the application - mostly for authentication
├── models/
|   ├── The database model definitions for the application
├── node_modules/
|   ├── Module dependencies
├── index.js
|   ├── Main index file, all definitions & reactDOM render
├── package.json
|   ├── package.json file
├── README.md
|   ├── README.md file
```

### Models
The following are the database model definitions for The Street View Tourist:

#### Category
The Category model defines a category type in which the various Street View panoramas can be indexed by. An example would be a church, skyscraper, etc.

The Category Schema:  
  * name -> STRING: The name of the category
  * data.image -> STRING: A link to the image
  * data.source -> STRING: A copyright source to the image if needed

#### Comment
The Comment model defines a text comment that a user may leave on any of the view pages.

The Comment Schema:  
  * comment -> STRING: The body text of the inputted comment
  * date.type -> DATE: The comment creation date (defaulted as now)
  * date.view_id -> LOCATION: The id of the location the comment is associated with
  * date.username -> STRING: The username connected to the user's account

#### Country
The Country model defines a country in which the various Street View panoramas can also be indexed by. An example would be Canada, United States, etc.

The Country Schema:  
  * name -> STRING: The name of the country
  * data.info -> STRING: The info description of the country
  * data.link -> STRING: A link to additional information
  * data.image -> STRING: A link to the image
  * data.source -> STRING: A copyright source to the image if needed
  * users.popularity -> NUMBER: A percentage representing the popularity of the country
  * users.comments -> ARRAY (STRING): A list of comments associated with the country

#### Location
The Location model defines a particular location that a user can explore on the website. 

The Location Schema:  
  * type -> STRING: The type of the location (i.e. bridge, church, etc.)
  * landmark -> BOOLEAN: Whether the location is considered a landmark
  * name -> STRING: The name of the location
  * location.continent -> STRING: The continent of the location
  * location.country -> STRING: The country of the location
  * location.area -> STRING: The area of the location, usually a state or province
  * location.city -> STRING: The city of the location
  * data.image -> STRING: A link to the image
  * data.source -> STRING: A copyright source to the image if needed
  * data.link -> STRING: A link to additional information
  * data.info -> STRING: The info description of the location
  * view.lat -> NUMBER: The latitude of the location
  * view.lng -> NUMBER: The longitude of the location
  * view.heading -> NUMBER: The heading of the location (0-360)
  * view.pitch -> NUMBER: The pitch of the Street View camera
  * view.zoom -> NUMBER: The zoom of the Street View camera
  * view.indoor -> BOOLEAN: Whether the Street View camera of the location is indoors or not
  * users.popularity -> NUMBER: Popularity rating of the view, defaulted to 0
  * users.userCreated -> BOOLEAN: Whether the location is user created
  * users.comments -> ARRAY (STRING): A list of comments for the location
  * alternate -> OBJECT: An alternate Street View location, same object format as body.view

#### User
The User model defines a registered user on the website.

The User Schema:  
  * username -> STRING: A unique username to represent the user
  * password -> STRING: The user's password which is encrypted
  * favorites -> ARRAY (LOCATION): A list of locations that are favorited by the user

### Controllers
The following are the routes which handle the various action controllers:

#### Auth
##### POST route /signin
`http://localhost:3001/api/street_view/auth/signin`

* Logs the user in
* Requirements
  * body.username -> The username of the account you wish to authenticate
  * body.password -> The password of the account you wish to authenticate
* Returns a JWT token upon a successful login, otherwise an error

##### POST route /signup
`http://localhost:3001/api/street_view/auth/signup`

* Creates a user
* Requirements
  * body.username -> The username of the new account you wish to register
  * body.password -> The password of the new account you wish to reigster 
* Returns a JWT token upon a successful register, otherwise an error

#### Categories
##### POST route /add_category
`http://localhost:3001/api/street_view/categories/add_category`

* Creates a new view category
* Requirements:
  * body.name -> The name of the category
  * body.data.image -> A link to the image
  * body.data.source -> A copyright source to the image if needed
  * Example usage of the request body:
    ```   {
          "name": "Bridge",
          "data": {
            "image": "https://imgur.com/some_image",
            "source": "Copyright Some Person CC/SA 3.0"
          }
        }
    ```
* Returns a success string if created

#### Comments

#### Countries

#### Favorites

#### Info

#### Locations

### Middleware
The following is the middleware that this application uses:

#### Authentication

## About Me  
I'm a computer science graduate looking to break into the world of professional software and web development. For more information about me, visit my website at [puljak.ca](https://puljak.ca)!