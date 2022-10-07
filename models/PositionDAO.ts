import db from './connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Position from './Position';

enum Query {
	INSERT = "INSERT INTO Positions(title) VALUES($1)",
	SELECT = "SELECT id, title FROM Positions WHERE id = $1",
	SELECT_BY_TITLE = "SELECT id, title FROM Positions WHERE title = $1",
	UPDATE = "UPDATE Positions SET title = $1 WHERE id = $2",
	DELETE = "DELETE FROM Positions WHERE id = $1"
};

class PositionDAO extends Position implements IModel {
	constructor(){
		super();
	}

	public async insert(): Promise<QueryResult | Error> {	
		if((await this.titleExists())){
			return new Error("This Position already exist");
		}

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

	public async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
	
			if(res.rowCount > 0){
				return res;
			}else{
				return new Error("This position does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Position");
		}
	}

	public async selectByTitle(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT_BY_TITLE,
				[this.title]);
	
			if(res.rowCount > 0){
				return res;
			}else{
				return new Error("This position does not exists");
			}
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Position");
		}
	}


	public async update(newValue: string): Promise<QueryResult | Error> {
		if((await this.idExists()) === false){
			return new Error("This Position doesnt exist");
		}
		
		try{
			const res: QueryResult = await db.query(Query.UPDATE,
				[newValue, this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Position");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.idExists()) === false){
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

	public async idExists(): Promise<boolean> {
		const foundId = await this.select();
		
		return ((foundId instanceof Error) === false);
	}

	public async titleExists(): Promise<boolean> {
		const foundTitle = await this.selectByTitle();

		return ((foundTitle instanceof Error) === false);
	}
}

export default PositionDAO;
