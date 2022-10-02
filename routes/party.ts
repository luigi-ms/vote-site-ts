import express, { Router, Request, Response } from 'express';
import PartyActions from '../actions/PartyActions';

const party: Router = express.Router();

party.post("/party/new", (req: Request<{ fullName: string, initials: string }>, res: Response) => {
	const { fullName, initials } = req.body;

	PartyActions.create(fullName, initials)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

party.get("/party/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PartyActions.read(parseInt(id))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

party.put("/party/modify", (req: Request<{ id: number, field: string, newValue: string }>, res: Response) => {
	const { id, field, newValue } = req.body;

	PartyActions.update(id, field, newValue)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

party.delete("/party/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PartyActions.destroy(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});


export default party;
