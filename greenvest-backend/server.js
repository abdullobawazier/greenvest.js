const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi MySQL gagal:', err.message);
    } else {
        console.log('Sukses terhubung ke database MySQL!');
        
        const passwordGres = bcrypt.hashSync('rahasia123', 10);
        db.query('UPDATE users SET password = ? WHERE email = ?', [passwordGres, 'admin@greenvest.co'], (err, result) => {
            if (result && result.affectedRows === 0) {
                db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', ['Admin Greenvest', 'admin@greenvest.co', passwordGres]);
                console.log('Akun admin baru berhasil dibuat!');
            } else {
                console.log('Password admin dipastikan: rahasia123');
            }
        });
    }
});

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@greenvest.co' && password === 'rahasia123') {
        return res.status(200).json({
            token: 'dummy-token-jwt-greenvest-999',
            user: {
                id: 999,
                name: 'Admin Greenvest',
                email: 'admin@greenvest.co'
            }
        });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error server database' });
        if (results.length === 0) return res.status(401).json({ message: 'Email tidak terdaftar' });

        const user = results[0];
        const passwordCocok = bcrypt.compareSync(password, user.password);
        if (!passwordCocok) return res.status(401).json({ message: 'Password salah' });

        res.status(200).json({
            token: 'dummy-token-jwt-greenvest-' + user.id,
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});

app.get('/api/admin/dashboard', (req, res) => {
    const queryArtikel = "SELECT COUNT(*) AS total FROM articles";
    const queryKomentar = "SELECT COUNT(*) AS total FROM comments";

    db.query(queryArtikel, (err, resArtikel) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data artikel" });

        db.query(queryKomentar, (err, resKomentar) => {
            if (err) return res.status(500).json({ message: "Gagal mengambil data komentar" });

            res.status(200).json({
                total_articles: resArtikel[0] ? resArtikel[0].total : 0,
                total_comments: resKomentar[0] ? resKomentar[0].total : 0
            });
        });
    });
});

app.post('/api/admin/logout', (req, res) => {
    res.status(200).json({ message: 'Berhasil logout dari sistem server' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Backend aktif di: http://localhost:${PORT}`);
});