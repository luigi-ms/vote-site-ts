import User from './User';

class Candidate extends User {
	private _digit: number;
	private _party: string;
	private _position: string;
	private _votes: number;
	private _state: string;

	constructor(){
		super('', 0);
		this._digit = 0;
		this._party = "";
		this._position = "";
		this._votes = 0;
		this._state = "";
	}

	public get digit(): number {
		return this._digit;
	}

	public set digit(newDigit: number){
		this._digit = newDigit;
	}

	public get party(): string {
		return this._party;
	}

	public set party(newParty: string){
		this._party = newParty;
	}

	public get position(): string {
		return this._position;
	}

	public set position(newPosition: string){
		this._position = newPosition;
	}

	public get votes(): number {
		return this._votes;
	}

	public set votes(newVotes: number){
		this._votes = newVotes;
	}

	public get state(): string {
		return this._state;
	}

	public set state(newState: string){
		this._state = newState;
	}
}

export default Candidate;
