import { QueryResult } from 'pg';
import CandidateDAO from '../models/CandidateDAO';

class CandidateActions {
	static async create(name: string, age: number, digit: number, partyId: number, positionId: number): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();
			
		if(this.isInvalid('name', name) && this.isInvalid('age', age) && this.isInvalid('digit', digit) && this.isInvalid('partyID', partyId) && this.isInvalid('positionID', positionId) ){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

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

	static async read(digit: number): Promise<Array<any> | Error> {
		const cand = new CandidateDAO();

		if(this.isInvalid('digit', digit)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		cand.digit = digit;

		try{
			const data = await cand.select();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async update(digit: number, field: string, newValue: number | string): Promise<QueryResult | Error> {
		const cand = new CandidateDAO();

		if(this.isInvalid('digit', digit) && this.isInvalid('field', field) && this.isInvalid('newValue', newValue)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

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

		if(this.isInvalid('digit', digit)){
			return Promise.reject(new Error('incorrect value or missing field'));
		}

		cand.digit = digit;

		try{
			const data = await cand.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static isInvalid(param: string, value: any): boolean {
		const cand = new CandidateDAO();
		const constraints = {
			checkDigit: isNaN(value) || (typeof value !== typeof cand.digit),
			checkAge: isNaN(value) || (typeof value !== typeof cand.age),
			checkPartyID: isNaN(value) || (typeof value !== typeof cand.partyId),
			checkPositionID: isNaN(value) || (typeof value !== typeof cand.positionId),
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
		}else if(param === 'partyID' && constraints.checkPartyID){
			return true;
		}else if(param === 'positionID' && constraints.checkPositionID){
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
