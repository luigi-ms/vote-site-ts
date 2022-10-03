import { QueryResult } from 'pg';
import VoterDAO from '../models/VoterDAO';

class VoterActions {
	static async create(id: number, name: string, age: number): Promise<QueryResult | Error> {
		const voter = new VoterDAO();

		if(this.isInvalid('id', id) && this.isInvalid('name', name) && this.isInvalid('age', age)){
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

		if((this.isInvalid('id', id))){
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

		if(this.isInvalid('id', id) && this.isInvalid('field', field) && this.isInvalid('newValue', newValue)){
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

		if(this.isInvalid('id', id)){
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

	static isInvalid(param: string, value: any): boolean {
		const voter = new VoterDAO();
		const constraints = {
			checkID: isNaN(value) || (typeof value !== typeof voter.id),
			checkName: (typeof value !== typeof voter.name),
			checkAge: (typeof value !== typeof voter.age),
			checkField: (typeof value !== 'string'),
			checkNewValue: isNaN(value)
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
			return true;
		}else{
			return false;
		}
	}
}

export default VoterActions;
