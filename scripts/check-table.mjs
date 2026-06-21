import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString:
    "postgresql://postgres:u1HzT7IW341wGj3R@db.ifiaoezxieqkewbauusd.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

await client.connect();

const { rows } = await client.query(`
  SELECT column_name, data_type, is_nullable, column_default
  FROM information_schema.columns
  WHERE table_name = 'partner_requests'
  ORDER BY ordinal_position
`);

if (rows.length === 0) {
  console.log("❌ Tabela partner_requests NU exista.");
} else {
  console.log("✓ Tabela partner_requests — coloane:");
  rows.forEach((c) =>
    console.log(
      `  ${c.column_name.padEnd(15)} ${c.data_type.padEnd(20)} ${c.is_nullable === "NO" ? "NOT NULL" : "        "} ${c.column_default ? "(default)" : ""}`
    )
  );
}

await client.end();
