const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3306;

// Configuration de la base de données
const connection = mysql.createConnection({
  host: '2a09:bac2:57a1:c8::14:2d1',
  port: 3306,
  user: 'votre_user',
  password: 'votre_mot_de_passe',
  database: 'votre_base_de_donnees'
});

// Connectez-vous à la base de données
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" folder

// Routes API
// 1. Obtenir toutes les propriétés
app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM properties', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 2. Ajouter une propriété
app.post('/api/properties', (req, res) => {
    const { name, rent } = req.body;
    const sql = 'INSERT INTO properties (name, rent) VALUES (?, ?)';
    db.query(sql, [name, rent], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name, rent, rented: false, paid: false });
    });
});

// 3. Mettre à jour une propriété (par exemple, statut loué/payé)
app.put('/api/properties/:id', (req, res) => {
    const { id } = req.params;
    const { rented, paid } = req.body;
    const sql = 'UPDATE properties SET rented = ?, paid = ? WHERE id = ?';
    db.query(sql, [rented, paid, id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// 4. Supprimer une propriété
app.delete('/api/properties/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM properties WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.post('/api/payments', (req, res) => {
    const { property_id, payment_date, amount } = req.body;

    const sql = 'INSERT INTO payments (property_id, payment_date, amount) VALUES (?, ?, ?)';
    db.query(sql, [property_id, payment_date, amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, property_id, payment_date, amount });
    });
});
app.get('/api/properties/:id/payments', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM payments WHERE property_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
