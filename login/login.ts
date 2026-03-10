import { Component, OnInit } from '@angular/core';
import { LoginApiservice } from '../myservice/login-apiservice';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username: string = '';
  password: string = '';
  errorMsg: string = '';
  cookieInfo: any = null;

  constructor(private loginService: LoginApiservice) {}

  ngOnInit(): void {
    // Đọc cookie khi mở trang
    this.loginService.readLoginCookie().subscribe({
      next: (data: any) => {
        if (data.username) {
          this.username = data.username;
          this.cookieInfo = data;
        }
      }
    });
  }

  doLogin(): void {
    this.errorMsg = '';
    this.cookieInfo = null;

    if (!this.username || !this.password) {
      this.errorMsg = 'Vui lòng nhập Username và Password!';
      return;
    }

    this.loginService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        if (!data.success) {
          this.errorMsg = data.message || 'Đăng nhập thất bại!';
        }
      },
      error: () => {
        this.errorMsg = 'Sai username hoặc password!';
      }
    });
  }

  doLogout(): void {
    this.loginService.logout().subscribe();
    this.username = '';
    this.password = '';
    this.cookieInfo = null;
    this.errorMsg = '';
  }
}