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
		if((await this.itExists())){
			return new Error("This Voter already exists");
		}

		const res: QueryResult = await db.query(Query.INSERT,
			[this.name, this.age, this.id]);

		return res;
	}

	public async select(): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[this.id]);

		return (res.rowCount > 0)
			? res
			: new Error("This voter does not exists");
	}

	public async update(field: string, newValue: number | boolean): Promise<QueryResult | Error> {
		let updateQuery: string = "";

		if((await this.itExists()) === false){
			return new Error("This Voter doesnt exist");
		}

		if((field !== "age") && (field !== "voted_yet")){
			return new Error("Unable to update");
		}else if(field === 'age'){
			updateQuery = Query.UPDATE.replace(/\$0/, "age");
		}else if(field === 'voted_yet'){
			updateQuery = Query.UPDATE.replace(/\$0/, "voted_yet");
		}

		const res: QueryResult = await db.query(updateQuery,
			[newValue, this.id]);

		return res;
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.itExists()) === false){
			return new Error("This Voter doesnt exist");
		}

		const res: QueryResult = await db.query(Query.DELETE,
			[this.id]);
		return res;
	}

	public async itExists(): Promise<boolean> {
		const found = await this.select();

		return ((found instanceof Error) === false);
	}
}

export default VoterDAO;
