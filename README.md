# Street View Tourist API Server

## Table of Contents  
**[About](#about)**  
[Installation](#installation)  
[Live Deployment](#live-deployment)  
[Technology Used](#technology-used)  
**[Project Code](#project-code)**  
[Models](#models)  
  - [Category](#category)  
  - [Comment](#comment)  
  - [Country](#country)  
  - [Location](#location)  
  - [User](#user)
[Controllers](#controllers)  
  - [Auth](#auth)  
  - [Categories](#categories)  
  - [Comments](#comments)  
  - [Countries](#countries)  
  - [Favorites](#favorites)  
  - [Info](#info)  
  - [Location](#locations)
[Middleware](#middleware)  
  - [Authentication](#authentication)  
**[About Me](#about-me)**

## About


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
- Express server framework 
- MongoDB for the database
- Mongoose for MongoDB object modeling
- Passport middleware for local and JSON web token authentication
- bcrypt for password hashing

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

#### Category
A comment looks like this.

#### Comment
This is a Location

#### Country  

#### Location  

#### User  

### Controllers

#### Auth

#### Categories

#### Comments

#### Countries

#### Favorites

#### Info

#### Locations

### Middleware

#### Authentication

## About Me  
I'm a computer science graduate looking to break into the world of professional software and web development. For more information about me, visit my website at [puljak.ca](https://puljak.ca)!