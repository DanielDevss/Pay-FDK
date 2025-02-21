import { Router } from 'express';
import {
    addBankAccount,
    completeDataConnect,
    createUser,
    deleteUser,
    getBankAccount,
    readUser,
    updateUser,
    uploadIdentityFiles,
} from '../../controllers/web/user.controller.js';
import { authenticated } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', createUser);

router.put('/', authenticated, updateUser);

router.delete('/', authenticated, deleteUser);

router.get('/', authenticated, readUser);

router.post('/charges-enable', authenticated, completeDataConnect);

router.post('/bank', authenticated, addBankAccount);

router.get('/bank', authenticated, getBankAccount);

router.post('/upload-identity-files', authenticated, uploadIdentityFiles)


export default router;   
