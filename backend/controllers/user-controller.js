import User from '../model/user.js'
import bcrypt  from 'bcryptjs'

// async function because all https task are asynchronous(Functions running in parallel with other functions are called asynchronous. eg - setTimeout)

// get all the users from the database
export const getAllUsers = async(req, res, next) => {
    let users;

    // always use a try-catch whenever using a db because db operations might just fail
    try{
        users = await User.find();
        // find function in mongoose will find every user within User
    }
    catch(err){
        return console.log(err);
    }

    if(!users){
        return res.status(404).json({message:"No Users found"});
    }

    return res.status(200).json({users});
}


// signup functionality
export const signup = async(req, res, next) => {
    // req.body means Postman body
    const {name, email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exists. Login Instead."});
    }
    
    // returns an encrypted password
    const hashedPassword = bcrypt.hashSync(password)
    
    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs:[]
    })
    try {
        // async 
        await user.save();   
    } catch (error) {
        return console.log(error);
    }

    return res.status(200).json({user});
}


// login user functionality

export const login = async(req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({message:"User not found. SignUp first."});
    }

    // comparing the passwords to make sure the user is signed up;
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(404).json({message: "Incorrect password"});
    }

    return res.status(200).json({message: "User Logged in successfully.", user: existingUser})

}