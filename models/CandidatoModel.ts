import db from '../connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Candidate from './Candidato';

class CandidateModel extends Candidate implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("INSERT INTO Candidates(name, age, digit, party_id, position_id) VALUES($1, $2, $3, $4)",
				[this.name, this.digit, this.partyId, this.positionId]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during insert Candidate");
		}
	}

	public async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("SELECT * FROM Candidates",
				[]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Candidate");
		}
	}

	public async update(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("",
				[]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Candidate");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("",
				[]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during removing Candidate");
		}
	}

	public async itExists(): Promise<boolean> {
		const found = await this.select();
		return found ? true : false;
	}
}

export default CandidateModel;
