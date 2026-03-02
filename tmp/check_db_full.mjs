import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

async function check() {
    try {
        const res = await sql`
      SELECT s.id, s.name, s.vendor_id, v.category, v.location, v.shop_name 
      FROM services s 
      JOIN vendors v ON s.vendor_id = v.id
    `;
        console.log(JSON.stringify(res, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}

check();
