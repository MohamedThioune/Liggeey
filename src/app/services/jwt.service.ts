import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserToken } from '../interfaces/user-token';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  decodeToken(token: string): UserToken {
    return jwt_decode(token);
  }
}
