import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN is required');
    }
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
};

main();
