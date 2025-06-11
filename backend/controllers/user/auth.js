const pool = require("../../config/db")
const {comparePassword} = require("../../services/authService")

const auth = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userQuery = `SELECT password FROM users WHERE username = $1`;
    const resultUserQuery = await pool.query(userQuery, [username]);

    if (resultUserQuery.rowCount === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const hashedPassword = resultUserQuery.rows[0].password;

    const compare = await comparePassword(password, hashedPassword);

    if (!compare) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.status(200).json({ message: "Autenticación exitosa" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error al autenticar usuario",
      error: error.message
    });
  }
};

module.exports = auth