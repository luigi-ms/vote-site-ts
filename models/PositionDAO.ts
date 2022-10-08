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

		const res: QueryResult = await db.query(Query.INSERT,
			[this.title]);

		return res;
	}

	public async select(): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[this.id]);
	
		return (res.rowCount > 0)
			? res
			: new Error("This position does not exists");
	}

	public async selectByTitle(): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT_BY_TITLE,
			[this.title]);
	
		return (res.rowCount > 0)
			? res
			: new Error("This position does not exists");
	}

	public async update(newValue: string): Promise<QueryResult | Error> {
		if((await this.idExists()) === false){
			return new Error("This Position doesnt exist");
		}
		
		const res: QueryResult = await db.query(Query.UPDATE,
			[newValue, this.id]);

		return res;
	}

	public async remove(): Promise<QueryResult | Error> {
		if((await this.idExists()) === false){
			return new Error("This Position doesnt exist");
		}

		const res: QueryResult = await db.query(Query.DELETE,
			[this.id]);

		return res;
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
