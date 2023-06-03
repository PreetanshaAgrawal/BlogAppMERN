Steps to create this project- 

    s1 - npm init in the folder backend
    s2 - npm i nodemon
    s3 - npm i express
    s4 - npm i mongoose
    
    s5 - changes in package.json(start and type)
    
    s6 - app.js (basic express file)
    
    s7- create three folders (routes, controllers, models)
    
    s8 - mongoDb creation (go to official site and sign up then create a new database project for free);
    
    s9 - mongoDb connection 
    
    s10 - trying it with the application Postman "http://localhost:5000/api/user"

    s11 - "http://localhost:5000/api/user/signup" in postman by post request and raw body in JSON format for testing the request for signing up the user.

    s12 - npm i bycryptjs to store the hashed password in mongodb

    s-13 - create the user and blog schema and for the connecting the user to the blogs such that the can be saved to the existing user we use-

        -> mongoose.Types.ObjectId to take the user and blog by their ids.
        -> session = mongoose.startSession() to start the session
        -> session.startTransaction() to start the transaction
        -> session.commitTransaction() to commit the transaction

    s-14 - for frontend use cmd 'npx create-new-app frontendreact'
    s-15 - then install material ui 
    s-16 - npm i react-router-dom for login and signup functionality(basically to connect all the links to the button)
    s-17 - import it index.js

    s-18- npm i react-redux @reduxjs/toolkit for checking the state isLoggedIn or not    

    s-19 - npm i axios in frontendreact folder for fe/be connections(sending the request to be with axios for the connection)

    s-20 - npm i cors in backend folder for handling the cors error (an error which occurs when one browser is trying to connect with the other)