import { QueryResult } from 'pg';
import VoterDAO from '../models/VoterDAO';
import Voter from '../models/Voter';

class VoterActions {
	static async create(id: number, name: string, age: number): Promise<Voter | Error> {
		const dao = new VoterDAO();

		if(this.isInvalid('id', id) || this.isInvalid('name', name) || this.isInvalid('age', age)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}
	
		dao.id = id;
		dao.name = name;
		dao.age = age;

		try{
			const data = await dao.insert();

			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const result = await this.read(dao.id);

				return Promise.resolve(result);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Voter | Error> {
		const dao = new VoterDAO();
		const voter = new Voter();

		if((this.isInvalid('id', id))){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.id = id;

		try{
			const data = await dao.select();
			
			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				voter.id = data.rows[0].id;
				voter.name = data.rows[0].name;
				voter.age = data.rows[0].age;
				voter.votedYet = data.rows[0].voted_yet;

				return Promise.resolve(voter);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, field: string, newValue: number | boolean): Promise<Voter | Error> {
		const dao = new VoterDAO();

		if(this.isInvalid('id', id) || this.isInvalid('field', field) || this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}else if(field === 'age' && (typeof newValue !== typeof dao.age)){
			return Promise.reject(new Error('incorrect type to "age" field'));
		}else if(field === 'voted_yet' && (typeof newValue !== typeof dao.votedYet)){
			return Promise.reject(new Error('incorrect type to "voted yet?" field'));
		}

		dao.id = id;

		try{
			const data = await dao.update(field, newValue);
	
			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const result = await this.read(dao.id);

				return Promise.resolve(result);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(id: number): Promise<string | Error> {
		const dao = new VoterDAO();

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.id = id;

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
		const voter = new VoterDAO();
		const constraints = {
			checkID: isNaN(value) || (typeof value !== typeof voter.id),
			checkName: (typeof value !== typeof voter.name),
			checkAge: (typeof value !== typeof voter.age),
			checkField: (typeof value !== 'string'),
			checkNewValue: (typeof value === 'number' && isNaN(value))
		};

		if(param === 'id' && constraints.checkID){
			return true;
		}else if(param === 'name' && constraints.checkName){
			return true;
		}else if(param === 'age' && constraints.checkAge){
			return true;
		}else if(param === 'field' && constraints.checkField){
			return true;
		}else if(param === 'newValue' && constraints.checkNewValue){
			console.log('newvalue not ok');
			return true;
		}else{
			return false;
		}
	}
}

export default VoterActions;
