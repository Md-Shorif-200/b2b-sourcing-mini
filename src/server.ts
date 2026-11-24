import app from './app.js';
import pool from './config/database.js';

const PORT = 5000;

const startServer = async () => {

    try {

        await pool.query('SELECT 1');

        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error('Database connection failed:', error);

        process.exit(1);
    }
};

startServer();