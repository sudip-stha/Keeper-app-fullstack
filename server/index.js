import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt_secret = process.env.JWT_SECRET;

const db = new pg.Client({
  user: process.env.DB_USER,
  host:process.env.DB_HOST,
  database:process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});
db.connect()
  .then(() => console.log("PostgreSQL client connected"))
  .catch((err) => console.error("Connection error", err));

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO Users (name,password) VALUES ($1,$2)", [
      username,
      hashpassword,
    ]);

    res.json({ message: "User registered successfull" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCheck = await db.query("SELECT * FROM users WHERE name=$1", [
      username,
    ]);

    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: "user not found" });
    }
    const user = userCheck.rows[0];
    const checkPwd = await bcrypt.compare(password, user.password);
    if (!checkPwd) {
      return res.json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: "2h" });
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "server error" });
  }
});
app.post("/notes", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  try {
    const result = await db.query(
      "INSERT INTO notes (user_id, title, description) VALUES ($1,$2,$3) RETURNING *",
      [userId, title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add note" });
  }
});
app.get("/getNotes", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query("SELECT * FROM notes WHERE user_id=$1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

app.delete("/notes/:id", verifyToken, async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await db.query(
      "DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *",
      [noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
