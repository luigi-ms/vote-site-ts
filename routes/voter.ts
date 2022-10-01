import express, { Router, Request, Response } from 'express';
import VoterActions from '../actions/VoterActions';

const voter: Router = express.Router();

voter.post("/signup/voter/", (req: Request<{ id: number, name: string, age: number }>, res: Response) => {
	const { id, name, age } = req.body;

	VoterActions.create(id, name, age)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

voter.get("/voter/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	VoterActions.read(parseInt(id))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

voter.put("/voter/", (req: Request<{ id: number, field: string, newValue: any }>, res: Response) => {
	const { id, field, newValue } = req.body;

	VoterActions.update(id, field, newValue)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

voter.delete("/voter/", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	VoterActions.destroy(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default voter;
