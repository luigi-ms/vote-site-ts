import db from '../connect';
import { QueryResult } from 'pg';
import IModel from './IModel';
import Voter from './Voter';

enum Query {
	INSERT = "INSERT INTO Voters(name, age, id) VALUES($1, $2, $3)",
	SELECT = "SELECT id, name, age, voted_yet FROM Voters WHERE digit = $1",
	UPDATE = "UPDATE Voters SET $1 =$2 WHERE digit = $3",
	DELETE = "DELETE FROM Voters WHERE digit = $1"
};

class VoterModel extends Voter implements IModel {
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

	public async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.SELECT,
				[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during select Voter");
		}
	}

	public async update(field: string, newValue: any): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This Voter doesnt exist");
		}

		if((field !== "name") && (field !== "age") && (field !== "votes")){
			return new Error("Unable to update");
		}
		
		try{
			const res: QueryResult = await db.query(Query.UPDATE,
				[field, newValue, this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Some Error during update Voter");
		}
	}

	public async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
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
		return found ? true : false;
	}
}

export default VoterModel;