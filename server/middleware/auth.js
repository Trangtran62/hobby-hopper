import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // Google token is > 500

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.TOKEN);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token); // Google token
            req.userId = decodedData?.sub;
        }

        next();
    } catch (err) {
        console.log(err);
    }
};

export default auth;