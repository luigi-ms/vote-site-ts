import { QueryResult } from 'pg';
import express, { Router, Request, Response } from 'express';
import PositionActions from '../actions/PositionActions';

const pos: Router = express.Router();

pos.post<{}, any, { title: string }>("/position/new/", (req: Request, res: Response) => {
	const title: string = req.body.title;

	PositionActions.create(title)
		.then((resolved: QueryResult | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved.command });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected })
		});
});

pos.get("/position/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PositionActions.read(parseInt(id))
		.then((resolved: Array<any> | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved });
			}
		})
		.catch(rejected => res.status(400).json({ rejected }));
});

pos.put("/position/modify", (req: Request<{ id: number, field: string, newValue: string }>, res: Response) => {
	const { id, field, newValue } = req.body;

	PositionActions.update(id, field, newValue)
		.then((resolved: QueryResult | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved.command });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message })
		});
});

pos.delete("/position/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PositionActions.destroy(id)
		.then((resolved: QueryResult | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved.command });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message })
		});
});

export default pos;
