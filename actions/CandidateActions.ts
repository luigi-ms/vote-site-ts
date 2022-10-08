import { QueryResult } from 'pg';
import CandidateDAO from '../models/CandidateDAO';
import Candidate from '../models/Candidate';

class CandidateActions {
	static async create(name: string, age: number, digit: number, party: string, position: string): Promise<Candidate | Error> {
		const dao = new CandidateDAO();
			
		if(this.isInvalid('name', name) && this.isInvalid('age', age) && this.isInvalid('digit', digit) && this.isInvalid('party', party) && this.isInvalid('position', position)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.digit = digit;
		dao.name = name;
		dao.age = age;
		dao.party = party;
		dao.position = position;

		try{
			const data = await dao.insert();

			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const result = await this.read(dao.digit);
				return Promise.resolve(result);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(digit: number): Promise<Candidate | Error> {
		const dao = new CandidateDAO();

		if(this.isInvalid('digit', digit)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.digit = digit;

		try{
			const data = await dao.select();

			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const cand = new Candidate();

				cand.digit = data.rows[0].digit;
				cand.name = data.rows[0].name;
				cand.age = data.rows[0].age;
				cand.party = data.rows[0].party;
				cand.position = data.rows[0].position;

				return Promise.resolve(cand);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(digit: number, field: string, newValue: number | string): Promise<Candidate | Error> {
		const dao = new CandidateDAO();

		if(this.isInvalid('digit', digit) && this.isInvalid('field', field) && this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.digit = digit;

		try{
			const data = await dao.update(field, newValue);

			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const result = await this.read(dao.digit);

				return Promise.resolve(result);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(digit: number): Promise<string | Error> {
		const dao = new CandidateDAO();

		if(this.isInvalid('digit', digit)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.digit = digit;

		try{
			const data = await dao.remove();

			if(data instanceof Error){
				return Promise.reject(data);
			}else{
			 return Promise.resolve(data.command);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static isInvalid(param: string, value: any): boolean {
		const cand = new CandidateDAO();
		const constraints = {
			checkDigit: isNaN(value) || (typeof value !== typeof cand.digit),
			checkAge: isNaN(value) || (typeof value !== typeof cand.age),
			checkParty: (typeof value !== typeof cand.party),
			checkPosition: (typeof value !== typeof cand.position),
			checkName: (typeof value !== typeof cand.name),
			checkField: (typeof value !== 'string'),
			checkNewValue: isNaN(value) || (typeof value !== 'string')
		};

		if(param === 'digit' && constraints.checkDigit){
			return true;
		}else if(param === 'name' && constraints.checkName){
			return true;
		}else if(param === 'age' && constraints.checkAge){
			return true;
		}else if(param === 'party' && constraints.checkParty){
			return true;
		}else if(param === 'position' && constraints.checkPosition){
			return true;
		}else if(param === 'field' && constraints.checkField){
			return true;
		}else if(param === 'newValue' && constraints.checkNewValue){
			return true;
		}else{
			return false;
		}
	}
}

export default CandidateActions;
