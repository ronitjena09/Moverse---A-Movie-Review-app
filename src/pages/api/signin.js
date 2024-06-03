import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Authentication successful, return user data (excluding password)
      const { password: _, ...userData } = user._doc;
      return res.status(200).json({ message: "Sign-in successful", user: userData });
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
