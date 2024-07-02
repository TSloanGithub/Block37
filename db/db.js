import pg from 'pg'

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:3001"