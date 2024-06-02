// pages/api/signup.js
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import axios from 'axios'; // Import Axios

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { firstName, lastName, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            // Use Axios to make a POST request to another endpoint or service
            const axiosResponse = await axios.post('https://example.com/other-endpoint', {
                firstName,
                lastName,
                email,
            });

            console.log('Axios Response:', axiosResponse.data);

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
