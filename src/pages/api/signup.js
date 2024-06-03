// pages/api/signup.js
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import authHandler from "./authHandler"

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Use internal function for further authentication logic
      const authResponse = await authHandler(newUser);

      return res.status(200).json(authResponse);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
