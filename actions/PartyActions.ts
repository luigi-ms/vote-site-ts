import { QueryResult } from 'pg';
import PartyDAO from '../models/PartyDAO';

class PartyActions {
	static async create(fullName: string, initials: string): Promise<QueryResult | Error> {
		const party = new PartyDAO();
	
		if(this.isInvalid('fullName', fullName) && this.isInvalid('initials', initials)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

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

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

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

		if(this.isInvalid('id', id) || this.isInvalid('field', field) || this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}else if(field === 'fullName' && (typeof newValue !== typeof party.fullName)){
			return Promise.reject(new Error('incorrect type to "fullName" field'));
		}else if(field === 'initials' && (typeof newValue !== typeof party.initials)){
			return Promise.reject(new Error('incorrect type to "initials" field'));
		}

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

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		party.id = id;

		try{
			const data = await party.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static isInvalid(param: string, value: any): boolean {
		const party = new PartyDAO();
		const constraints = {
			checkID: isNaN(value) || (typeof value !== typeof party.id),
			checkInitials: (typeof value !== typeof party.initials),
			checkFullName: (typeof value !== typeof party.fullName),
			checkField: (typeof value !== 'string'),
			checkNewValue: (typeof value !== 'string')
		};

		if(param === 'id' && constraints.checkID){
			return true;
		}else if(param === 'initials' && constraints.checkInitials){
			return true;
		}else if(param === 'fullName' && constraints.checkFullName){
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

export default PartyActions;
