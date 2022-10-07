import { QueryResult } from 'pg';
import PartyDAO from '../models/PartyDAO';
import Party from '../models/Party';

class PartyActions {
	static async create(fullName: string, initials: string): Promise<string | Error> {
		const dao = new PartyDAO();
	
		if(this.isInvalid('fullName', fullName) || this.isInvalid('initials', initials)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.fullName = fullName;
		dao.initials = initials;

		try{
			const data = await dao.insert();
			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				return Promise.resolve(data.command);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Party | Error> {
		const dao = new PartyDAO();

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.id = id;

		try{
			const data = await dao.select();
			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const party = new Party();

				party.id = data.rows[0].id;
				party.fullName = data.rows[0].fullname;
				party.initials = data.rows[0].initials;

				return Promise.resolve(party);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, field: string, newValue: string): Promise<Party | Error> {
		const dao = new PartyDAO();

		if(this.isInvalid('id', id) || this.isInvalid('field', field) || this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}else if(field === 'fullName' && (typeof newValue !== typeof dao.fullName)){
			return Promise.reject(new Error('incorrect type to "fullName" field'));
		}else if(field === 'initials' && (typeof newValue !== typeof dao.initials)){
			return Promise.reject(new Error('incorrect type to "initials" field'));
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
		const dao = new PartyDAO();

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
