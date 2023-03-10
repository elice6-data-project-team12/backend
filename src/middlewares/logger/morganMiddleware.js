import morgan from 'morgan';

import dotenv from 'dotenv';
import { logger } from './config/logger';

dotenv.config();

const format = () => {
    const result = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    return result;
};


const stream = {
    write: (message) => {
        logger.http(
            message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")
        );
    },
};


const skip = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.statusCode < 400;
    }
    return false;
};

//? 적용될 moran 미들웨어 형태
const morganMiddleware = morgan(format(), {stream, skip});

export default morganMiddleware;
