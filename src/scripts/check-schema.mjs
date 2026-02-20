import postgres from 'postgres';

const connectionString = "postgresql://postgres:Sarthak@1234@db.hcazdemlwnzedebzkjbh.supabase.co:5432/postgres";

async function checkCols() {
    const sql = postgres(connectionString);
    try {
        const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'services'`;
        console.log('Columns in services table:', cols.map(c => c.column_name));
    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkCols();
