import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: 'string',
        rquired: true
    },
    description: {
        type: 'string',
        rquired: true
    },
    image: {
        type: 'string',
        rquired: true
    },
    user: {
        // to connect the user to the blog, so that each blog has one user but each user has multiple blogs
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model("Blog", blogSchema);