import { Router } from 'express'
import { create, find, get, update } from '../controllers/User'

const router = Router()

router.get('/', get)

router.get('/:id', (req, res) => find(req, res, false))

router.post('/', create)

router.put('/:id', update)

// find method essentially does the same thing but can be used to delete a user if param is passed.
router.delete('/:id', (req, res) => find(req, res, true))

export default router