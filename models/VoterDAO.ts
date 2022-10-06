import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Voter from './Voter';

enum Query {
	INSERT = "INSERT INTO Voters(name, age, id) VALUES($1, $2, $3)",
	SELECT = "SELECT id, name, age, voted_yet FROM Voters WHERE id = $1",
	UPDATE = "UPDATE Voters SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Voters WHERE id = $1"
};

class VoterDAO extends Voter implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[this.name, this.age, this.id]);

			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during insert Voter");
		}
	}

	public async select(): Promise<Array<any> | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);

			if(res.rowCount > 0){
				return res.rows;
			}else{
				return new Error("This voter does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Voter");
		}
	}

	public async update(field: string, newValue: number | boolean): Promise<QueryResult | Error> {
		let updateQuery: string = "";

		if((await this.itExists())){
			return new Error("This Voter doesnt exist");
		}

		if((field !== "age") && (field !== "voted_yet")){
			return new Error("Unable to update");
		}else if(field === 'age'){
			updateQuery = Query.UPDATE.replace(/\$0/, "age");
		}else if(field === 'voted_yet'){
			updateQuery = Query.UPDATE.replace(/\$0/, "voted_yet");
		}
		
		try{
			const res: QueryResult = await db.query(updateQuery,
				[newValue, this.id]);

			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Voter");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This Voter doesnt exist");
		}

		try{
			const res: QueryResult = await db.query(Query.DELETE,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during removing Voter");
		}
	}

	public async itExists(): Promise<boolean> {
		const found = await this.select();

		return (found instanceof Error) ? true : false;
	}
}

export default VoterDAO;
