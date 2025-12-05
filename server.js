const express = require("express");
const Pool = require('pg').Pool;
const app = express();

app.use(express.static('public'));
app.use(express.json());


const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'postgres',
   password: 'postgres',
   port: 5432,
});

//run "localhost/test-db" in browser to see if node connects to postgres database
app.get('/test-db', async (req, res) => { 
    try {
       // Run a simple query
       const result = await pool.query('SELECT NOW()');
       res.json({
          success: true,
          message: 'Database connected successfully!',
          serverTime: result.rows[0].now,
       });
    } catch (err) {
       console.error('Database connection failed:', err);
       res.status(500).json({
          success: false,
          error: 'Failed to connect to the database',
       });
    }
 });
 app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Insert user data into the database
        const result = await pool.query(
            `INSERT INTO users (Name, email, password) VALUES ($1, $2, $3) RETURNING id`,
            [name, email, password]
        );

        // Respond with success
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            userId: result.rows[0].id,
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === '23505') {
            res.status(400).json({ success: false, error: 'Email already exists!' });
        } else {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
});
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database to check if the user exists
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            // No user found with the given email
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // Get the first user from the result
        const user = result.rows[0];

        // Check if the password matches (without hashing for now)
        if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // If credentials are correct, send a success response
        res.json({
            success: true,
            message: 'Login successful!',
            userId: user.id, // You can return the user ID or any other relevant information
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.listen(80, () => {
   console.log("Listening on port 80");
});
