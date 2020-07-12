import { User } from './auth.model';

export class UserModel implements User {
    constructor(
        private _email?: string,
        private _token?: string,
        private _isSharing?: boolean
    ) {}

    get email() {
        return this._email;
    }

    get token() {
        return this._token;
    }

    get isSharing() {
        return this._isSharing;
    }

}