import express, { Router, Request, Response } from 'express';
import PositionActions from '../actions/PositionActions';

const pos: Router = express.Router();

pos.post("/position/new/", (req: Request<{ title: string }>, res: Response) => {
	const title: string = req.body.title;

	PositionActions.create(title)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

pos.get("/position/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PositionActions.read(parseInt(id))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

pos.put("/position/modify", (req: Request<{ id: number, field: string, newValue: string }>, res: Response) => {
	const { id, field, newValue } = req.body;

	PositionActions.update(id, field, newValue)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

pos.delete("/position/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PositionActions.destroy(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default pos;
