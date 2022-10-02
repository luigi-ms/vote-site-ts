import express, { Router, Request, Response } from 'express';
import CandidateActions from '../actions/CandidateActions';

const cand: Router = express.Router();

cand.post("/signup/candidate/", (req: Request<{ id: number, name: string, age: number, partyID: number, positionID: number }>, res: Response) => {
	const { digit, name, age, partyID, positionID } = req.body;

	CandidateActions.create(name, age, digit, partyID, positionID)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

cand.get("/candidate/:digit", (req: Request, res: Response) => {
	const digit: string = req.params.digit;

	CandidateActions.read(parseInt(digit))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

cand.put("/candidate/modify", (req: Request<{ digit: number, field: string, newValue: number | string }>, res: Response) => {
	const { digit, field, newValue } = req.body;

	CandidateActions.update(digit, field, newValue)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

cand.delete("/candidate/remove", (req: Request<{ digit: number }>, res: Response) => {
	const digit: number = req.body.digit;

	CandidateActions.destroy(digit)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default cand;
