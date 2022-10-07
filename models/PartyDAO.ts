import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Party from './Party';

enum Query {
	INSERT = "INSERT INTO Parties(fullname, initials) VALUES($1, $2)",
	SELECT_BY_ID = "SELECT initials, fullname FROM Parties WHERE id = $1",
	SELECT_BY_FULLNAME = "SELECT initials, fullname FROM Parties WHERE fullname = $1",
	UPDATE = "UPDATE Parties SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Parties WHERE id = $1"
};

class PartyDAO extends Party implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This Party already exists");
		}

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
			const res: QueryResult = await db.query(Query.SELECT_BY_ID,
				[this.id]);
	
			if(res.rowCount > 0){
				return res;
			}else{
				return new Error("This party does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Party");
		}
	}

	public async selectByFullName(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT_BY_FULLNAME,
				[this.fullName]);
	
			if(res.rowCount > 0){
				return res;
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

		if((await this.itExists()) === false){
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
		if((await this.itExists()) === false){
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
		const foundId = await this.select();
		const foundName = await this.selectByFullName();

		return ((foundId instanceof Error) === false || (foundName instanceof Error) === false) 
			? true
			: false;
	}
}

export default PartyDAO;
