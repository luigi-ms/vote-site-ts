import { QueryResult } from 'pg';
import PartyDAO from '../models/PartyDAO';

class PartyActions {
	static async create(fullName: string, initials: string): Promise<QueryResult | Error> {
		const party = new PartyDAO();
	
		party.fullName = fullName;
		party.initials = initials;

		try{
			const data = await party.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Array<any> | Error> {
		const party = new PartyDAO();

		party.id = id;

		try{
			const data = await party.select();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, field: string, newValue: string): Promise<QueryResult | Error> {
		const party = new PartyDAO();

		party.id = id;

		try{
			const data = await party.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(id: number): Promise<QueryResult | Error> {
		const party = new PartyDAO();

		party.id = id;

		try{
			const data = await party.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}
}

export default PartyActions;
