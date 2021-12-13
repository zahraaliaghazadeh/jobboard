# [Job board](https://jobboard2021.herokuapp.com/)
> A Full Stack job board application built with React, JavaScript, HTML, CSS

## Table of contents
* [General info](#general-info)
* [Enjoy Live](#enjoy-live)
* [Writeup](#writeup)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Resources](#resources)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

Battleship is a board game that pits 2 players against each other.
This repo contains the free game which is where the user playing on one board and the normal game which has two boards and the user plays against the AI.

<br>

## Enjoy Live

You can enjoy the app at: [Link](https://jobboard2021.herokuapp.com/)
You can use username ```test``` and password ```test``` for logging in.

## Screenshots

Below, you see a demo of some of the functionalities of the app. <br>
![Gif](./src/assets/images/gif2.gif) <br>



## Technologies
* HTML5
* CSS3
* React
* JavaScript
* Bootstrap


## Setup
If you dont have an IDE on your computer, you can install [Visual Code IDE](https://code.visualstudio.com/download). Then you will download the code or clone the repository.
Then you open terminal in that folder and type the command `npm install` , this will install all the dependencies in the package.json file, such as bootstrap, react, react-router-dom, etc. After the installation is finished, you can use the command `npm run devstart` to start the react server, this will open the app in your browser, if it doesn't, open localhost:8000 in your browser. 

## Requirements
```
"dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.24.0",
    "bcrypt": "^5.0.1",
    "bootstrap": "^5.1.3",
    "concurrently": "^6.4.0",
    "connect-mongo": "^4.6.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "draft-js": "^0.11.7",
    "draftjs-to-html": "^0.9.1",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "http-status-codes": "^2.1.4",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.13",
    "nodemon": "^2.0.15",
    "path": "^0.12.7",
    "query-string": "^4.3.4",
    "react": "^17.0.2",
    "react-bootstrap": "^2.0.2",
    "react-bootstrap-icons": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-draft-wysiwyg": "^1.14.7",
    "react-images-upload": "^1.2.8",
    "react-loading-ui": "^1.2.3",
    "react-router": "^6.0.2",
    "react-router-dom": "^6.0.2",
    "react-scripts": "4.0.3",
    "react-select": "^5.2.1",
    "web-vitals": "^1.0.1"
  },
```

## Features
* Homepage search field has case-insensitive search in the job and can match for incomplete words.  job title, location and company name. displaying upon search
* Job details page has Job title, Company name, Location, Description, Employer, email, contact (formatted as a click anchor tag using the mailto feature)  
  Optionally, a link to the company website (if one is not provided, do not show this field)
  Posting date (this should be calculated when inserted into the database), Favorite/unfavorite button for logged in users.
* Login/Registration page with error handling. Cookie setup and redirecting to home page.
If a user tries to sign in with a nonexistent user or attempts to log in with an invalid password
If a user tries to register an existing username
If a user tries to register but their password and password verification don’t match

* CRUD functionality of a job posting with redirection to job details page.
* Favorites page, only visible to logged in user
* Password Encryption
* Rich Text Editor
* Correct Post/Login Redirect 
* Company Icon photo upload
* Job Submission Tracker


To-do list:
* Better Design

## Resources
Some useful websites especially for design:
* Choosing colors [coloors.co](https://coolors.co/)
* Creating favicon for your react app to replace the generic react logo [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
* Great images resource free for download [https://unsplash.com/](https://unsplash.com/)
* Resource for icons with ability to change colors [https://game-icons.net/](https://game-icons.net/)
* Resource for gradient in css, [gradient.io](https://cssgradient.io/)


## Status
Project is: _finished_

## Inspiration
Project 3, CS5610

## Contact
<!-- <img src="./assets/pic1.png" width="80px"> <br> -->
Yalda Ali Aghazadeh : Developer/ Designer
[Github](https://github.com/zahraaliaghazadeh) ,
[LinkedIn](www.linkedin.com/in/zahraaliaghazadeh)



