import express, { Router, Request, Response } from 'express';
import VotingActions from '../actions/VotingActions';

const voting: Router = express.Router();

voting.post<{}, any, { voterID: number, candidateDigit: number }>('/vote/', (req: Request, res: Response) => {
	const { voterID, candidateDigit } = req.body;

	VotingActions.vote(voterID, candidateDigit)
		.then((resolved: string | Error) => {
			if(resolved instanceof Error){
				res.status(500).json({ error: resolved.message });
			}else{
				res.status(200).json({ success: resolved })
			}
		})
		.catch((rejected: Error) => {
			res.status(400).json({ error: rejected.message });
		});
});

export default voting;
