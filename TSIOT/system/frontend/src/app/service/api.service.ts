import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  authBaseUrl: string = 'http://api-users.smauec.net/api/auth/';
  userBaseUrl: string = 'http://api-users.smauec.net/api/users/';
  ruleBaseUrl: string = 'http://api-rules.smauec.net/api/rules/';

  login(loginPayload) : Observable<ApiResponse> {
        //  return this.http.post<ApiResponse>('http://localhost:8081/api/auth/signin', loginPayload);
    return this.http.post<ApiResponse>(this.authBaseUrl + 'signin' , loginPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.userBaseUrl);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.userBaseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.userBaseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.userBaseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.userBaseUrl + id);
  }
}

