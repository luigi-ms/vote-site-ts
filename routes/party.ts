import { QueryResult } from 'pg';
import express, { Router, Request, Response } from 'express';
import PartyActions from '../actions/PartyActions';

const party: Router = express.Router();

party.post<{}, any, { fullName: string, initials: string }>("/party/new", (req: Request, res: Response) => {
	const { fullName, initials } = req.body;

	PartyActions.create(fullName, initials)
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

party.get("/party/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PartyActions.read(parseInt(id))
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

party.put("/party/modify", (req: Request<{ id: number, field: string, newValue: string }>, res: Response) => {
	const { id, field, newValue } = req.body;

	PartyActions.update(id, field, newValue)
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

party.delete("/party/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PartyActions.destroy(id)
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


export default party;
