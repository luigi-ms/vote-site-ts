import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Party from './Party';

enum Query {
	INSERT = "INSERT INTO Parties(fullname, initials) VALUES($1, $2)",
	SELECT = "SELECT initials, fullname FROM Parties WHERE id = $1",
	UPDATE = "UPDATE Parties SET $1 = $2 WHERE id = $3",
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

	public async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Party");
		}
	}

	public async update(field: string, newValue: any): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This Party doesnt exist");
		}

		if((field !== "id") && (field !== "fullname") && (field !== "initials")){
			return new Error("Unable to update");
		}
		
		try{
			const res: QueryResult = await db.query(Query.UPDATE,
				[field, newValue, this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Party");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
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
		return found ? true : false;
	}
}

export default PartyDAO;
