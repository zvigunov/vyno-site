import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  "postgresql://postgres:u1HzT7IW341wGj3R@db.ifiaoezxieqkewbauusd.supabase.co:5432/postgres";

const [, , migrationFile] = process.argv;
if (!migrationFile) {
  console.error("Utilizare: node scripts/migrate.mjs <fisier.sql>");
  process.exit(1);
}

const sqlPath = path.resolve(__dirname, "..", migrationFile);
if (!fs.existsSync(sqlPath)) {
  console.error(`Fisierul nu exista: ${sqlPath}`);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, "utf8");

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log("Conectat la Supabase PostgreSQL.");
  await client.query(sql);
  console.log(`✓ Migrare aplicata: ${migrationFile}`);
} catch (err) {
  console.error("Eroare la migrare:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
