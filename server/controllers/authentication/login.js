const RimUser = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Incoming login body:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await RimUser.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        userName: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '40m' }
    );

    res.cookie('token', token, {
      httpOnly: true,          
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',          
      maxAge: 40 * 60 * 1000,   
      path: '/',               
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        userName: user.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = { login };
