import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { User } from "./userModel";
import { Injectable, Input, Type } from "@angular/core";
import { response } from "express";
import { catchError } from "rxjs/operators";
import { map, Observable, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HTTPServiceRequest {
    data: any = [];
    data1: any = [];
    idInt: number | undefined;

    url = 'http://localhost:3000/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',

        }),

    };
    constructor(private http: HttpClient) { }
    getRoleList() {
        return this.http
            .get<{ name: string; key: string }[]>(this.url + 'roles')
            .pipe(
                map((res) => {
                    const roleslist: { name: string; key: string }[] = [];
                    res.forEach((response) => {
                        roleslist.push(response);
                    });
                    return roleslist;
                }),
                catchError(this.errorHandler)
            );
    }

    getCustomerList() {
        return this.http
            .get<{ name: string; id: number }[]>(this.url + 'customers')
            .pipe(
                map((res) => {
                    const list: { name: string; id: number }[] = [];
                    res.forEach((res) => {
                        list.push(res);
                    });
                    return list;
                }),
                catchError(this.errorHandler)
            );
    }

    getCustomer() {
        return this.http
            .get<{ name: string; id: number }[]>(this.url + 'customers')
            .pipe(
                map((res) => {
                    const list: { name: string; id: number }[] = [];
                    res.forEach((res) => {
                        list.push(res);
                    });
                    return list;
                }),
                catchError(this.errorHandler)
            );
    }
    get() {
        return this.http.get<User>('http://localhost:3000/users');
    }

    onDelete(id: number) {
        return this.http.delete<User>('http://localhost:3000/users/' + `${id}`);
    }
    getCustomerById(id: number) {
        const url = 'http://localhost:3000/customers/';
        return this.http.get(url + id);
    }
    updateUser(user: User) {

        const url = 'http://localhost:3000/users/';
        return this.http.put<User>(url + user.id, user, this.httpOptions);
    }
    createUser(data: User) {
        const myBody = {
            id: Number(data.id),
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            roleName: data.roleName,
            customerName: data.customerName,
            address: data.address
        }

        const url = 'http://localhost:3000/users';
        return this.http
            .post(url, myBody, this.httpOptions)
            .pipe(catchError(this.errorHandler));

    }

    getUserId(id: any) {
        const url = 'http://localhost:3000/users';
        return this.http.get(`${url}/${id}`, this.httpOptions)
            .pipe(
                map((res: any) => {
                    return res || {};
                }),
                catchError(this.errorHandler)
            );
    }
    errorHandler(error: any) {
        let errorMessage = 'generic error';

        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
