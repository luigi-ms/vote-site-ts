import { QueryResult } from 'pg';
import PositionDAO from '../models/PositionDAO';
import Position from '../models/Position';

class PositionActions {
	static async create(title: string): Promise<string | Error> {
		const dao = new PositionDAO();
		
		if(this.isInvalid('title', title)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.title = title;

		try{
			const data = await dao.insert();
			
			if(data instanceof Error){
				return Promise.reject(data)
			}else{
				return Promise.resolve(data.command);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async read(id: number): Promise<Position | Error> {
		const dao = new PositionDAO();

		if(this.isInvalid('id', id)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}


		dao.id = id;

		try{
			const data = await dao.select();
			if(data instanceof Error){
				return Promise.reject(data);
			}else{
				const pos = new Position();

				pos.id = data.rows[0].id;
				pos.title = data.rows[0].title;

				return Promise.resolve(pos);
			}
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(id: number, newValue: string): Promise<Position | Error> {
		const dao = new PositionDAO();

		if(this.isInvalid('id', id) || this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		dao.id = id;

		try{
			const data = await dao.update(newValue);
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
		const dao = new PositionDAO();

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
		const pos = new PositionDAO();
		const constraints = {
			checkID: isNaN(value) || (typeof value !== typeof pos.id),
			checkTitle: (typeof value !== typeof pos.title),
			checkNewValue: (typeof value !== 'string')
		};

		if(param === 'id' && constraints.checkID){
			return true;
		}else if(param === 'title' && constraints.checkTitle){
			return true;
		}else if(param === 'newValue' && constraints.checkNewValue){
			return true;
		}else{
			return false;
		}
	}
}

export default PositionActions;
