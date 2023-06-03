import mongoose from "mongoose";

// way to define the schema
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true, minlength: 6},
    blogs : [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]
});

export default mongoose.model('User', userSchema);
// in mongodb there are some naming conventions, like this model will be stored in the db by the name : "users"(plural)