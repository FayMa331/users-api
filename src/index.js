import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import supabase from './config/supabase.js'
import userRoutes from './routers/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

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
  res.json({ 
    message: 'Welcome to ClassMate API!',
    version: '2.0',
    endpoints: {
      users: '/users',
      userById: '/users/:id',
      userProfiles: '/users/profiles'
    }
  })
})

// User routes
app.use('/users', userRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
