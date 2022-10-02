import { QueryResult } from 'pg';
import VoterDAO from '../models/VoterDAO';

class VoterActions {
	static async create(id: number, name: string, age: number): Promise<QueryResult | Error> {
		const voter = new VoterDAO();

		if((typeof id !== typeof voter.id) || (typeof name !== typeof voter.name) || (typeof age !== typeof voter.age)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}
	
		voter.id = id;
		voter.name = name;
		voter.age = age;

		try{
			const data = await voter.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Array<any> | Error> {
		const voter = new VoterDAO();

		if(typeof id !== typeof voter.id){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		voter.id = id;

		try{
			const data = await voter.select();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, field: string, newValue: number | boolean): Promise<QueryResult | Error> {
		const voter = new VoterDAO();

		if((typeof id !== typeof voter.id) || (typeof field !== 'string')){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		voter.id = id;

		try{
			const data = await voter.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(id: number): Promise<QueryResult | Error> {
		const voter = new VoterDAO();

		if(typeof id !== typeof voter.id){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		voter.id = id;

		try{
			const data = await voter.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}
}

export default VoterActions;
