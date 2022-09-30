abstract class User {
	private _name: string;
	private _age: number;

	constructor(name: string, age: number){
		this._name = name;
		this._age = age;
	}

	public get name(): string {
		return this._name;
	}

	public set name(newName: string){
		this._name = newName;
	}

	public get age(): number {
		return this._age;
	}

	public set age(newAge: number){
		this._age = newAge;
	}
}

export default User;
