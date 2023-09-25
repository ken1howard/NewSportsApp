

- NFL ACCESS Application

Description:

This application is to get basic information about your favorite football team in the National Football League. User don't know the basic information about their favorite football team like the league and the conference. This application will provide users with that information and it bring forth data about the user's favorite football team. There is more opportunities to add more information to render on this application at your convience.

- Backend Databases

The backend being used is Python(Flask) & create a virtual Environment

This application is pulling from an online free NFL Api to render the NFL teams. Provide logic to render the informaiton how you chose. On this page it's rendered in the navigation bar to free up space for the images and animations on the page.
It also has the potential for user authentication for the user register and sign in for the application so it can save the user's information everytime they return to the site through Postgres.

- Front End Files

This is a react front end app (npx create-react-app) command in the terminal

-- Assets
This project has all the images rendered on the page in the asset folders and plug them in where they are needed.

-- src
This folder holds all the files that are being rendered on the page, the editprofile.js, app.js, loginpage.js registrationform.js, teammodal.js and sportsapi.js.

-- App.js 
The main page where are the logic nested and fetching data from other files to display on the page.

-- LoginPage
This page is connect to the database by saving passwords and usernames to enter the application.

-- TeamModal
This file is receiving the information from the free api to render the options on the page.

-- RegistrationForm
This page is used to insert the formation of the user into the data based whereas the login page retrives it.

- Styles
The styles folder is used for the styls for all the pages that have special effects, animations, or different designs