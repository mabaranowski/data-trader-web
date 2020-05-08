import { User } from './auth.model';

export class UserModel implements User {
    constructor(
        private _email?: string,
        private _token?: string
    ) {}

    get email() {
        return this._email;
    }

    get token() {
        return this._token;
    }

}