import { QueryResult } from 'pg';
import express, { Router, Request, Response } from 'express';
import VoterActions from '../actions/VoterActions';

const voter: Router = express.Router();

voter.post<{}, any, { id: number, name: string, age: number }>("/signup/voter/", (req: Request, res: Response) => {
	const { id, name, age } = req.body;

	VoterActions.create(id, name, age)
		.then((resolved: QueryResult | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved.command });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message });
		});
});

voter.get("/voter/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	VoterActions.read(parseInt(id))
		.then((resolved: Array<any> | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message });
		});
});

voter.put("/voter/modify", (req: Request<{ id: number, field: string, newValue: number | boolean }>, res: Response) => {
	const { id, field, newValue } = req.body;

	VoterActions.update(id, field, newValue)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

voter.delete("/voter/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	VoterActions.destroy(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default voter;
