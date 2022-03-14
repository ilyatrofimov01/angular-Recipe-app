import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthResponseData, AuthService } from "../services/auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth-component",
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.scss"]
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoading: boolean = false;
  isLoginMode: boolean = true;
  loginForm: FormGroup;
  error: string = null;
  authObs: Observable<AuthResponseData>;

  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
        this.router.navigate(["/recipes"]);
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.showErrorAlert(error);
      }
    });
    this.loginForm.reset();
  }

  private showErrorAlert(errorMessage: string) {
    //example of using instead ngIf 
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(AlertComponent);
    cmpRef.instance.message = this.error;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onHandleError() {
    return this.error = null;
  }
  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe();
  }
}

