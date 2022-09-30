import express, { Express } from 'express';
import { candidate } from './routes/candidate';
import { voter } from './routes/voter';
import { party } from './routes/party';
import { position } from './routes/position';
import { voting } from './routes/voting';

const app: Express = express();

app.use(candidate);
app.use(voter);
app.use(party);
app.use(position);
app.use(voting);

app.listen(8080, () => console.log("Server running on port 8080"));
