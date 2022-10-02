import { QueryResult } from 'pg';
import PositionDAO from '../models/PositionDAO';

class PositionActions {
	static async create(title: string): Promise<QueryResult | Error> {
		const pos = new PositionDAO();
	
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

		pos.id = id;

		try{
			const data = await pos.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

}

export default PositionActions;
