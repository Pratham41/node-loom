const pool = require("../config/db")
const bcrypt = require("bcryptjs")
const jose = require("jose");
const generateToken = require("../utils/token");


const registerUser = async(req,res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10)
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
          );
        client.release();
        const user = result.rows[0];
        res.cookie('jwt', generateToken(user.id), { httpOnly: true });
        res.redirect("/api/v1/record")
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

const loginUser = async(req,res) => {
    const { email, password } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      client.release();
  
      if (result.rows.length === 0) {
        return res.render("signin").json({ error: 'User not' });
      }
  
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
      if (isPasswordValid) {
        res.cookie('jwt', generateToken(user.id), { httpOnly: true });
        return res.redirect("/api/v1/record")
      } else {
        return res.redirect("/login")
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
}


const startRecord = async(req,res) => {
    try {
      const apiKey = process.env.APP_ID
      const privateKey = process.env.PRIVATE_KEY
      const pk = await jose.importPKCS8(privateKey, "RS256");
      let jws = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setIssuer(apiKey)
      .setExpirationTime("5s")
      .sign(pk);
      return res.render('index', { jws, username:req.user.username });

    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error!")
    }
}

module.exports = {
    registerUser,
    loginUser,
    startRecord,
}