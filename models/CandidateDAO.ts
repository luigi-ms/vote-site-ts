import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Candidate from './Candidate';

enum Query {
	INSERT = "INSERT INTO Candidates(name, digit, age, party, position) VALUES($1, $2, $3, $4, $5)",
	SELECT = "SELECT digit, position, name, party, votes FROM Candidates WHERE digit = $1",
	UPDATE_VOTES = "UPDATE Candidates SET votes = votes + 1 WHERE digit = $1",
	UPDATE = "UPDATE Candidates SET $0 = $1 WHERE digit = $2",
	DELETE = "DELETE FROM Candidates WHERE digit = $1"
};

class CandidateDAO extends Candidate implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This Candidate already exist");
		}
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[this.name, this.digit, this.age, this.party, this.position]);

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
			
			if(res.rowCount > 0){
			 return res;
			}else{
				return new Error("This Candidate does not exist");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Candidate");
		}
	}

	public async increaseVotes(): Promise<QueryResult> {
		const res: QueryResult = await db.query(Query.UPDATE_VOTES,
			[this.digit]);
		
		return res;
	}
	
	public async update(field: string, newValue: number | string): Promise<QueryResult | Error> {
		let updateQuery: string = "";

		if((await this.itExists()) === false){
			return new Error("This Candidate doesnt exist");
		}

		if((field !== "name") && (field !== "age") && (field !== "party") && (field !== "position")){
			return new Error("Unable to update");
		}else if(field === 'name'){
			updateQuery = Query.UPDATE.replace(/\$0/, "name");
		}else if(field === 'age'){
			updateQuery = Query.UPDATE.replace(/\$0/, "age");
		}else if(field === 'party'){
			updateQuery = Query.UPDATE.replace(/\$0/, "party");
		}else if(field === 'position'){
			updateQuery = Query.UPDATE.replace(/\$0/, "position");
		}
	
		try{
			const res: QueryResult = await db.query(updateQuery,
				[newValue, this.digit]);
			
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Candidate");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.itExists()) === false){
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
	
		return ((found instanceof Error) === false);
	}
}

export default CandidateDAO;
