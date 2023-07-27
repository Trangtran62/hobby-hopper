import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const TOKEN = process.env.TOKEN;

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "Invalid account" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, TOKEN, { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "error" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Account already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password does not match" });
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, TOKEN, { expiresIn: "1h"});

        res.status(200).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "error" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No id found');
    }

    await User.findByIdAndRemove(_id);

    res.json({ message: 'Post successfully deleted' });
}