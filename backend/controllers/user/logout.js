const logout = (req,res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
    res.status(200).json({ 
        status: true,
        message: "Sesión cerrada" 
    });
}
module.exports = logout