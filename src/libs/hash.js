
import bcrypt from 'bcryptjs';

export const passwordHash = async (password) => {
    return await bcrypt.hash(password, 12);
}