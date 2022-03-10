import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthResponseData, AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-component",
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.scss"]
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  isLoginMode: boolean = true;
  loginForm: FormGroup;
  error: string = null;
  authObs: Observable<AuthResponseData>

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.error = null;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authObs = this.authService.signIn({email, password});
    } else {
      this.authObs = this.authService.signUp({email, password});
    }
    this.authObs.subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res)
        this.router.navigate(['/recipes'])
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      }
    })
    this.loginForm.reset();
  }
}

