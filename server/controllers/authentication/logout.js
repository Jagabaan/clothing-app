
const logout = (req, res) => {
req.clearCookie("token").json({ 
    success: true,
     message: "Logged out successfully" });
}

module.exports = { logout };