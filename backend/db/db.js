// backend/db/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get the absolute path to the pets.db file
const dbPath = path.resolve(__dirname, 'pets.db');

// Open the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('✅ Connected to the SQLite database.');
  }
});

module.exports = db;

