import express, { Express } from 'express';
import cand from './routes/candidate';
import voter from './routes/voter';
import party from './routes/party';
import pos from './routes/position';

const app: Express = express();

app.use(cand);
app.use(voter);
app.use(party);
app.use(pos);

app.listen(8080, () => console.log("Server running on port 8080"));
