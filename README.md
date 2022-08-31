# GROUPOMANIA

Welcome to my 7th an last OpenClassrooms training project.
This project consists of building an internal social network for Groupomania employees.
It use nodeJS, express and mongoDB Atlas on the server side and ReactJS on the client side.

You can use this application on your machine by following the steps below :

  - 1rst make sure you have node installed. If that's not the case try this link [Node.js](https://nodejs.org/en/download/ "nodejs.org").

  - Then, you can clone this repository or download ZIP directly.

  - Afterwards, you can find 2 folders in this repository, one frontend and one backend. Run `npm install` in each of them to install all necessary dependencies.

  - Finally, in backend folder, run `nodemon server`*, and in frontend folder run `npm start` simultaneously.


## SPECIFICATION BACKEND*

For running this project you have to create and inform your own mongoDB variables.

Here is a link that may help you : [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) and follow this [setting up](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database)

When all are ready, in the backend folder, rename `.env.example` file by `.env` and replace all 'xxxxxx' by your own MongoDB variables.

To finish, create a folder `images` on this backend folder to recieve your images.

### The server is listening on 
`http://localhost:8000`