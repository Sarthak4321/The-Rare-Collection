import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple direct script without dotenv for more clarity in logs
const connectionString = "postgresql://postgres:Sarthak@1234@db.hcazdemlwnzedebzkjbh.supabase.co:5432/postgres";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
    console.log('--- DB INIT START ---');
    const sql = postgres(connectionString);

    try {
        const schemaPath = path.join(__dirname, '../../supabase/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('RUNNING SQL...');
        await sql.unsafe(schemaSql);

        console.log('--- DB INIT SUCCESS ---');
    } catch (err) {
        console.error('--- DB INIT ERROR ---');
        console.error(err);
    } finally {
        await sql.end();
    }
}

initDb();
