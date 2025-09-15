const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = path.join(__dirname, 'db', 'pets.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// API route: Get all pets
app.get('/api/pets', (req, res) => {
  const sql = "SELECT * FROM pets";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching pets:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
