const jwt = require("jsonwebtoken");
const pool = require("../config/db")
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.cookie &&
    req.headers.cookie.startsWith("jwt")
  ) {
    try {   
      token = req.headers.cookie.split("=")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    if (result.rows.length > 0) {
      req.user = {id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email}
      next();
    }
    } catch (error) {
      console.log(error);
      return res.redirect('/api/v1/login');
    }
  }
};