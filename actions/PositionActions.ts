import { QueryResult } from 'pg';
import PositionDAO from '../models/PositionDAO';

class PositionActions {
	static async create(title: string): Promise<QueryResult | Error> {
		const pos = new PositionDAO();
		
		if(this.isInvalid('title', title)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		pos.title = title;

		try{
			const data = await pos.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Array<any> | Error> {
		const pos = new PositionDAO();

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}


		pos.id = id;

		try{
			const data = await pos.select();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, field: string, newValue: string): Promise<QueryResult | Error> {
		const pos = new PositionDAO();

		if(this.isInvalid('id', id) || this.isInvalid('field', field) || this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}else if(field === 'title' && (typeof newValue !== typeof pos.title)){
			return Promise.reject(new Error('incorrect type to "title" field'));
		}

		pos.id = id;

		try{
			const data = await pos.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async destroy(id: number): Promise<QueryResult | Error> {
		const pos = new PositionDAO();

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}


		pos.id = id;

		try{
			const data = await pos.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static isInvalid(param: string, value: any): boolean {
		const pos = new PositionDAO();
		const constraints = {
			checkID: isNaN(value) || (typeof value !== typeof pos.id),
			checkTitle: (typeof value !== typeof pos.title),
			checkField: (typeof value !== 'string'),
			checkNewValue: (typeof value !== 'string')
		};

		if(param === 'id' && constraints.checkID){
			return true;
		}else if(param === 'title' && constraints.checkTitle){
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

export default PositionActions;
