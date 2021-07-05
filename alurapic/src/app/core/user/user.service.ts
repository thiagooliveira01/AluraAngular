import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject = new BehaviorSubject<User>({id:0, name:'',email:''});
    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
     }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    private decodeAndNotify() {
        const token : string = this.tokenService.getToken() || '';
        const user = jwt_decode(token) as User;
        this.userSubject.next(user);
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next({id:0, name:'',email:''});
    }
}