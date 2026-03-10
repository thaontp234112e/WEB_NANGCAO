import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginApiservice {
  API = 'http://localhost:4000';

  constructor(private http: HttpClient, private router: Router) {}

  // POST /login → nếu thành công navigate đến /fashion
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.API}/login`, body).pipe(
      tap((data: any) => {
        if (data.success) {
          this.router.navigate(['/fashion']);
        }
      })
    );
  }

  // GET /read-login-cookie → đọc cookie khi mở trang
  readLoginCookie(): Observable<any> {
    return this.http.get(`${this.API}/read-login-cookie`);
  }

  // GET /logout → xoá cookie
  logout(): Observable<any> {
    return this.http.get(`${this.API}/logout`);
  }
}