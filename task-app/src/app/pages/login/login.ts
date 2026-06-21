import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  // Toggle states
  isLoginMode: boolean = true;
  showPasswordLogin: boolean = false;
  showPasswordReg: boolean = false;
  
  // Login Form
  emailLogin: string = '';
  passwordLogin: string = '';
  rememberMe: boolean = false;

  // Register Form
  nameReg: string = '';
  emailReg: string = '';
  passwordReg: string = '';

  // UI State
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.emailLogin = savedEmail;
      this.rememberMe = true;
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  togglePasswordVisibility(form: 'login' | 'register'): void {
    if (form === 'login') {
      this.showPasswordLogin = !this.showPasswordLogin;
    } else {
      this.showPasswordReg = !this.showPasswordReg;
    }
  }

  login(): void {
    if (!this.emailLogin.trim() || !this.passwordLogin.trim()) {
      this.showError('Email ve şifre zorunludur.');
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    const loginData = {
      email: this.emailLogin,
      password: this.passwordLogin
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.isLoading = false;
        
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.emailLogin);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.showError(err.error?.message || 'Email veya şifre hatalı.');
        } else {
          this.showError('Giriş başarısız. Lütfen tekrar deneyin.');
        }
      }
    });
  }

  register(): void {
    if (!this.nameReg.trim() || !this.emailReg.trim() || !this.passwordReg.trim()) {
      this.showError('Tüm alanları doldurmanız gerekmektedir.');
      return;
    }

    if (this.passwordReg.length < 6) {
      this.showError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    const regData = {
      name: this.nameReg,
      email: this.emailReg,
      password: this.passwordReg
    };

    this.authService.register(regData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Kayıt başarılı! Yönlendiriliyorsunuz...';
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.error?.error || 'Kayıt olurken bir hata oluştu.');
      }
    });
  }

  forgotPassword(): void {
    if (!this.emailLogin.trim()) {
      this.showError('Lütfen önce e-posta adresinizi girin.');
      return;
    }
    this.errorMessage = '';
    this.successMessage = 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi! (Mock)';
  }

  private showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => this.errorMessage = '', 5000);
  }
}
