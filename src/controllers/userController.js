import supabase from '../config/supabase.js'

// Get all users
export const getAllUsers = async (req, res) => {
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
}

// Get single user by ID
export const getUserById = async (req, res) => {
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
}

// Get all users with profiles (JOIN)
export const getUsersWithProfiles = async (req, res) => {
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
}
