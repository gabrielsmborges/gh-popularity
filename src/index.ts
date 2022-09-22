import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getRepoData } from './util/popularity';


const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/popularity', async (req: Request, res: Response) => {
    const { repoName } = req.query;
    if (!repoName || typeof repoName !== 'string') {
        res.status(400).send('repoName is required');
        return;
    }
    const repoData = await getRepoData(repoName)
    res.send(repoData);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));