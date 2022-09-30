import db from '../connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Position from './Position';

enum Query {
	INSERT = "INSERT INTO Positions(title) VALUES($1)",
	SELECT = "SELECT id, title FROM Positions WHERE id = $1",
	UPDATE = "UPDATE Positions SET $1 =$2 WHERE id = $3",
	DELETE = "DELETE FROM Positions WHERE id = $1"
};

class PositionModel extends Position implements IModel {
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

	public async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Position");
		}
	}

	public async update(field: string, newValue: any): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This Position doesnt exist");
		}

		if(field !== "title"){
			return new Error("Unable to update");
		}
		
		try{
			const res: QueryResult = await db.query(Query.UPDATE,
				[field, newValue, this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Position");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
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
		return found ? true : false;
	}
}

export default PositionModel;
