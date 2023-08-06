import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No id found');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    // const userName = req.body;
    // const post = PostMessage.findById(_id);

    // if (userName !== post.creator) {
    //     return res.status(404).json({ message: 'unauthenticated' });
    // }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No id found');
    }

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post successfully deleted' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.body;

    if (!userId) return res.status(500).json({ message: "Log in to interact with posts" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No id found');
    }

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

    res.json(updatedPost);
}