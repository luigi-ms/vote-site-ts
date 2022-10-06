import { QueryResult } from 'pg';
import VoterDAO from '../models/VoterDAO';
import CandidateDAO from '../models/CandidateDAO';

class VotingActions {
	static async vote(voterId: number, candidateDigit: number): Promise<any | Error> {
		const voter = new VoterDAO(),
					cand = new CandidateDAO();

		if((await this.isVoterOk(voterId))){
			return Promise.reject(new Error("Error in voter id"));
		}else if((await this.isCandidateOk(candidateDigit))){
			return Promise.reject(new Error("Candidate doesnt exist"));
		}

		voter.id = voterId;
		cand.digit = candidateDigit;

		try{
			const voterRes = await voter.update('voted_yet', true),
				candRes = await cand.increaseVotes();

			return Promise.resolve([voterRes, candRes]);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async isVoterOk(id: number): Promise<boolean> {
		const voter = new VoterDAO();

		if(isNaN(id) || (typeof id !== typeof voter.id)){
			return false;
		}

		voter.id = id;

		return (await voter.itExists());
	}

	static async isCandidateOk(digit: number): Promise<boolean> {
		const cand = new CandidateDAO();

		if(isNaN(digit) || (typeof digit !== typeof cand.digit)){
			return false;
		}

		cand.digit = digit;

		return (await cand.itExists());
	}
}

export default VotingActions;
