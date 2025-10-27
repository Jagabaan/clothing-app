const bcrypt = require('bcrypt');
const RimUser = require('../../models/user');

const rimUserRegister = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

   const existingUser = await RimUser.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: 'Email already in use.',
  });
}


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new RimUser({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ 
      success: true,
      message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { rimUserRegister };
