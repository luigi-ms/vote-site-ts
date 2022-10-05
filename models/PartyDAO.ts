import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Party from './Party';

enum Query {
	INSERT = "INSERT INTO Parties(fullname, initials) VALUES($1, $2)",
	SELECT = "SELECT initials, fullname FROM Parties WHERE id = $1",
	UPDATE = "UPDATE Parties SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Parties WHERE id = $1"
};

class PartyDAO extends Party implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[this.fullName, this.initials]);

			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during insert Party");
		}
	}

	public async select(): Promise<Array<any> | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
	
			if(res.rowCount > 0){
				return res.rows;
			}else{
				return new Error("This party does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Party");
		}
	}

	public async update(field: string, newValue: string): Promise<QueryResult | Error> {
		let updateQuery: string = "";

		if((await this.itExists())){
			return new Error("This Party doesnt exist");
		}

		if((field !== "fullName") && (field !== "initials")){
			return new Error("Unable to update");
		}else if(field === 'fullName'){
			updateQuery = Query.UPDATE.replace(/\$0/, "fullname");
		}else if(field === 'initials'){
			updateQuery = Query.UPDATE.replace(/\$0/, "initials");
		}
			
		try{
			const res: QueryResult = await db.query(updateQuery,
				[newValue, this.id]);

			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Party");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This Party doesnt exist");
		}

		try{
			const res: QueryResult = await db.query(Query.DELETE,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during removing Party");
		}
	}

	public async itExists(): Promise<boolean> {
		const found = await this.select();
		return (found instanceof Error) ? true : false;
	}
}

export default PartyDAO;
