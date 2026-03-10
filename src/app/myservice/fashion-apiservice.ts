import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Fashion } from '../classes/Fashion';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class FashionApiservice {
  constructor(private _http: HttpClient) { }
  getFashions():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:4000/fashions",requestOptions).pipe(
  map(res => JSON.parse(res) as Array<Fashion>),
    catchError(this.handleError),
    retry(3) )
  }
  handleError(error:HttpErrorResponse){
  return throwError(()=>new Error(error.message))
  }

  getFashion(fashionId:string):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:4000/fashions/"+fashionId,requestOptions).pipe(
  map(res=>JSON.parse(res) as Fashion),
  catchError(this.handleError),
  retry(3))
  }

}
