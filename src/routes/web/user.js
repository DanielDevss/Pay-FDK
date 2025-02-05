import { Router } from 'express';
import {
    createUser,
    deleteUser,
    readUser,
    updateUser
} from '../../controllers/web/user.controller.js';

const router = Router();

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', readUser);


export default router;