import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Test Supabase connection
async function testConnection() {
  const { data, error } = await supabase.from('users').select('count')
  if (error) {
    console.error('❌ Error connecting to Supabase:', error.message)
  } else {
    console.log('✅ Connected to Supabase!')
  }
}

testConnection()

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ClassMate API with Supabase!' })
})

// GET /users - Get all users (refactored with Supabase ORM)
app.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id')

    if (error) throw error
    
    res.json(data)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET /users/profiles - Get all users with their profiles (NEW - using JOIN)
app.get('/users/profiles', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        user_profiles (
          date_of_birth,
          bio
        )
      `)
      .order('id')

    if (error) throw error
    
    res.json(data)
  } catch (error) {
    console.error('Error fetching user profiles:', error)
    res.status(500).json({ error: 'Failed to fetch user profiles' })
  }
})

// GET /users/:id - Get single user by ID (refactored with Supabase ORM)
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' })
      }
      throw error
    }
    
    res.json(data)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})