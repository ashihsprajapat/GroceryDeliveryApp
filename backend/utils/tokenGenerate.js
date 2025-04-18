
import jwt from 'jsonwebtoken';

export const generateSellerToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET,{
        expiresIn:'7d'
    });
}


export const generatorUserToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d',

    });
}