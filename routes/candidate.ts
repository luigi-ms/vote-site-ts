import { QueryResult } from 'pg';
import express, { Router, Request, Response } from 'express';
import CandidateActions from '../actions/CandidateActions';

const cand: Router = express.Router();

cand.post<{}, any, { digit: number, name: string, age: number, partyID: number, positionID: number }>("/signup/candidate/", (req: Request, res: Response) => {
	const { digit, name, age, partyID, positionID } = req.body;

	CandidateActions.create(name, age, digit, partyID, positionID)
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

cand.get("/candidate/:digit", (req: Request, res: Response) => {
	const digit: string = req.params.digit;

	CandidateActions.read(parseInt(digit))
		.then((resolved: Array<any> | Error) => {
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

cand.put("/candidate/modify", (req: Request<{ digit: number, field: string, newValue: number | string }>, res: Response) => {
	const { digit, field, newValue } = req.body;

	CandidateActions.update(digit, field, newValue)
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

cand.delete("/candidate/remove", (req: Request<{ digit: number }>, res: Response) => {
	const digit: number = req.body.digit;

	CandidateActions.destroy(digit)
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

export default cand;
