import express from 'express'
import { getAllUsers, getUserById, getUsersWithProfiles } from '../controllers/userController.js'

const router = express.Router()

// GET /users/profiles - must come before /:id
router.get('/profiles', getUsersWithProfiles)

// GET /users
router.get('/', getAllUsers)

// GET /users/:id
router.get('/:id', getUserById)

export default router
