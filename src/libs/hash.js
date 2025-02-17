import bcrypt from 'bcryptjs';

export const passwordHash = async (password) => {
    return await bcrypt.hash(password, 12);
}

export const verifyPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);    
    } catch (error) {
        console.log(error.message);
        return false;        
    }
}