import express, { Router, Request, Response } from 'express';
import PartyActions from '../actions/PartyActions';
import Party from '../models/Party';

const party: Router = express.Router();

party.post<{}, any, { fullName: string, initials: string }>("/party/new", (req: Request, res: Response) => {
	const { fullName, initials } = req.body;

	PartyActions.create(fullName, initials)
		.then((resolved: string | Error) => {
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

party.get("/party/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PartyActions.read(parseInt(id))
		.then((resolved: Party | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: {
					id: resolved.id,
					fullName: resolved.fullName,
					initials: resolved.initials
				}});
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message });
		});
});

party.put("/party/modify", (req: Request<{ id: number, field: string, newValue: string }>, res: Response) => {
	const { id, field, newValue } = req.body;

	PartyActions.update(id, field, newValue)
		.then((resolved: Party | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: {
					id: resolved.id,
					fullName: resolved.fullName,
					initials: resolved.initials
				}});
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message });
		});
});

party.delete("/party/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PartyActions.destroy(id)
		.then((resolved: string | Error) => {
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


export default party;
