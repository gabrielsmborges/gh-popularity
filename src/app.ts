import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getRepoData } from './util/popularity';


const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/popularity', async (req: Request, res: Response) => {
    const { repoName } = req.query;
    if (!repoName || typeof repoName !== 'string') {
        res.status(400).send({error: 'repoName is required'});
        return;
    }
    if (repoName.split('/').length !== 2) {
        res.status(400).send({error: 'repoName must be in the format owner/repo'});
        return;
    }
    try {
        const repoData = await getRepoData(repoName)
        res.send(repoData);
    } catch (error: any) {
        res.status(error.response.status).send(error);
    }
});


export default app;
