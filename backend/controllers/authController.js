import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registration page
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.userName, // <- use userName to match frontend
      email: req.body.email,
      password: hash,
      photo: req.body.photo || '', // optional default
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'Successfully registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed. Try again.' });
  }
};


// Login page
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    );

    const { password: pwd, role, ...rest } = user._doc;

    // Set token in cookie
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      })
      .status(200)
      .json({
        success: true,
        message: 'Logged in successfully',
        token,
        data: { ...rest },
        role,
      });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed. Try again' });
  }
};
