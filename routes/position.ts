import express, { Router, Request, Response } from 'express';
import PositionActions from '../actions/PositionActions';
import Position from '../models/Position';

const pos: Router = express.Router();

pos.post<{}, any, { title: string }>("/position/new/", (req: Request, res: Response) => {
	const title: string = req.body.title;

	PositionActions.create(title)
		.then((resolved: string | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected })
		});
});

pos.get("/position/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;

	PositionActions.read(parseInt(id))
		.then((resolved: Position | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: {
					id: resolved.id,
					title: resolved.title
				}});
			}
		})
		.catch(rejected => res.status(400).json({ rejected }));
});

pos.put("/position/modify", (req: Request<{ id: number, newTitle: string }>, res: Response) => {
	const { id, newTitle } = req.body;

	PositionActions.update(id, newTitle)
		.then((resolved: Position | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: {
					id: resolved.id,
					title: resolved.title
				}});
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message })
		});
});

pos.delete("/position/remove", (req: Request<{ id: number }>, res: Response) => {
	const id: number = req.body.id;

	PositionActions.destroy(id)
		.then((resolved: string | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved });
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message })
		});
});

export default pos;
