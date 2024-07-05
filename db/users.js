import client from './db.js'; 
import bcrypt from 'bcrypt';

const salt_count = 10;


const getAllUsers = async () => {
    try {
        const { rows } = await client.query('SELECT * FROM users');
        console.log('Selected users:', rows);
        return rows;
    } catch (e) {
        console.error('Failed to get all users', e);
        throw e;
    }
};


const getUserByUsername = async (username) => {
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        console.log('Selected user:', rows);
        return rows[0];
    } catch (e) {
        console.error(`Failed to retrieve user ${username}`, e);
        throw e;
    }
};


const createUser = async ({ username, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt_count);
        const { rows } = await client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        console.log('Created user:', rows[0]);
        return rows[0];
    } catch (e) {
        console.error('Failed to create new user', e);
        throw e;
    }
};

export { getAllUsers, getUserByUsername, createUser };
