import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "Invalid account" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.TOKEN, { expireIn: "1h "});

        res.status(200),json({ result: existingUser, token });
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

        const result = User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.TOKEN, { expireIn: "1h "});

        res.status(200),json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "error" });
    }
}