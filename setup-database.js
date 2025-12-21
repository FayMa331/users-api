import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function setupDatabase() {
  try {
    console.log('🔄 Creating users table...')
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('✅ Table created successfully!')

    console.log('🔄 Inserting test data...')
    
    await pool.query(`
      INSERT INTO users (first_name, last_name, email) VALUES
      ('Sarah', 'Johnson', 'sarah.j@northwestern.edu'),
      ('Michael', 'Chen', 'michael.c@northwestern.edu'),
      ('Emily', 'Davis', 'emily.d@northwestern.edu')
      ON CONFLICT (email) DO NOTHING;
    `)
    console.log('✅ Test data inserted successfully!')

    const result = await pool.query('SELECT * FROM users ORDER BY id')
    console.log('\n📊 Users in database:')
    console.table(result.rows)
    
    console.log('\n🎉 Database setup complete!')
    
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    await pool.end()
    process.exit(1)
  }
}

setupDatabase()