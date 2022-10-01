import { QueryResult } from 'pg';
import CandidateDAO from '../models/CandidateDAO';

class CandidateActions {
	static async create(name: string, age: number, digit: number, partyId: number, positionId: number): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();
	
		cand.digit = digit;
		cand.name = name;
		cand.age = age;
		cand.partyId = partyId;
		cand.positionId = positionId;

		try{
			const data = await cand.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(digit: number): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();

		cand.digit = digit;

		try{
			const data = await cand.select();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(digit: number, field: string, newValue: any): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();

		cand.digit = digit;

		try{
			const data = await cand.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(digit: number): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();

		cand.digit = digit;

		try{
			const data = await cand.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

}

export default CandidateActions;
