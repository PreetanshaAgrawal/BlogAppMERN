import Blog from "../model/Blog.js";
import User from "../model/user.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No Blogs found." })
    }
    return res.status(200).json({ blogs })

}


// adding a new blog 
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let userBlogs;

    try {
        userBlogs = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs) {
        return request.status(400).json({message: 'User not found by this Id'});
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        // saving the blog from the requested user
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        userBlogs.blogs.push(blog);
        await userBlogs.save({session});
        await session.commitTransaction();
    } 
    catch (error) {
        return res.status(500).json({message:error})
    }

    return res.status(200).json({ message: { blog } })

}

// this is the basic add blog functionality. but it will get complex whenever we add a relationship between the blog and the user.


// update the blog

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }
    catch(err){
        return console.log(err);
    }

    if(!blog){
        return res.status(500).json({message: 'Unable to update the blog'});
    }

    return res.status(200).json({blog})
}


export const getById = async(req, res, next) => {
    const blogId = req.params.id;

    let blog;
    
    try {
        blog = await Blog.findById(blogId);
        
    } catch (error) {
        return console.log(error);
    }

    if(!blog){
        return res.status(404).json({message: 'Blog Not Found'});
    }

    return res.status(200).json({blog});
}

// delete blog by id
export const deleteBlogById = async (req, res, next) => {
    const blogId = req.params.id;

    let blog;

    try {
        blog = await Blog.findByIdAndRemove(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    } catch (error) {
        return console.log(error);
    }

    if(!blog){
        return res.status(400).json({message: 'Unable to delete blog'});
    }

    return res.status(200).json({message: 'Successfully deleted blog'});
}


// getting all the blog entries by this user
export const getByUserId = async (req, res, next)=> {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }

    if(!userBlogs){
        return res.status(404).json({message: 'No blog found by this user Id'});
    }
    
    return res.status(200).json({user: userBlogs});
}