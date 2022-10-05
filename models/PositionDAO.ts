import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Position from './Position';

enum Query {
	INSERT = "INSERT INTO Positions(title) VALUES($1)",
	SELECT = "SELECT id, title FROM Positions WHERE id = $1",
	UPDATE = "UPDATE Positions SET $0 =$1 WHERE id = $2",
	DELETE = "DELETE FROM Positions WHERE id = $1"
};

class PositionDAO extends Position implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[this.title]);

			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during insert Position");
		}
	}

	public async select(): Promise<Array<any> | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
	
			if(res.rowCount > 0){
				return res.rows;
			}else{
				return new Error("This position does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Position");
		}
	}

	public async update(field: string, newValue: string): Promise<QueryResult | Error> {
		let updateQuery: string = "";

		if((await this.itExists())){
			return new Error("This Position doesnt exist");
		}

		if((field !== "title")){
			return new Error("Unable to update");
		}else if(field === 'title'){
			updateQuery = Query.UPDATE.replace(/\$0/, "title");
		}
		
		try{
			const res: QueryResult = await db.query(updateQuery,
				[newValue, this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Position");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This Position doesnt exist");
		}

		try{
			const res: QueryResult = await db.query(Query.DELETE,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during removing Position");
		}
	}

	public async itExists(): Promise<boolean> {
		const found = await this.select();
		return (found instanceof Error) ? true : false;
	}
}

export default PositionDAO;
