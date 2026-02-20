import postgres from 'postgres';

const connectionString = "postgresql://postgres:Sarthak@1234@db.hcazdemlwnzedebzkjbh.supabase.co:5432/postgres";

async function migrate() {
    const sql = postgres(connectionString);
    try {
        console.log('Migrating services table...');
        await sql.unsafe(`
            ALTER TABLE services 
            ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS address TEXT,
            ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2),
            ADD COLUMN IF NOT EXISTS duration TEXT,
            ADD COLUMN IF NOT EXISTS menu_highlights TEXT,
            ADD COLUMN IF NOT EXISTS menu_image_url TEXT;
        `);
        console.log('Migration successful.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await sql.end();
    }
}

migrate();
