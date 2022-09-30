import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Candidate from './Candidate';

enum Query {
	INSERT = "INSERT INTO Candidates(name, digit, party_id, position_id) VALUES($1, $2, $3, $4)",
	SELECT = "SELECT digit, title, name, initials FROM Candidates, Parties, Positions WHERE Parties.id = party_id AND Positions.id = position_id AND digit = $1",
	UPDATE = "UPDATE Candidates SET $1 =$2 WHERE digit = $3",
	DELETE = "DELETE FROM Candidates WHERE digit = $1"
};

class CandidateDAO extends Candidate implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
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
			const res: QueryResult = await db.query(Query.SELECT,
				[this.digit]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Candidate");
		}
	}

	public async update(field: string, newValue: any): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This Candidate doesnt exist");
		}

		if((field !== "name") && (field !== "age") && (field !== "votes")){
			return new Error("Unable to update");
		}
		
		try{
			const res: QueryResult = await db.query(Query.UPDATE,
				[field, newValue, this.digit]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Candidate");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This Candidate doesnt exist");
		}

		try{
			const res: QueryResult = await db.query(Query.DELETE,
				[this.digit]);
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

export default CandidateDAO;
