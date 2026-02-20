import postgres from 'postgres';

const connectionString = "postgresql://postgres:Sarthak@1234@db.hcazdemlwnzedebzkjbh.supabase.co:5432/postgres";

async function checkCols() {
    const sql = postgres(connectionString);
    try {
        const cols = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'bookings'`;
        console.log('Columns in bookings table:', cols.map(c => `${c.column_name} (${c.data_type})`));
    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkCols();
