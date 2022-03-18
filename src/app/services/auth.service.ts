import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment";

interface AuthCredential {
  email: string,
  password: string
}

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({providedIn: "root"})
export class AuthService {
  private apiKey: string = environment.firebaseKey;
  private tokenExpirationTimer: ReturnType<typeof setTimeout>
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {
  }


  signUp(credentials: AuthCredential) {
    return this.http.post<AuthResponseData>(`${environment.firebaseUrl}:signUp?key=${this.apiKey}`, {
      ...credentials,
      returnSecureToken: true
    }).pipe(catchError(this.errorHandler), tap(resData => {
      this.handleAuthenticated(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  signIn(credentials: AuthCredential) {
    return this.http.post<AuthResponseData>(`${environment.firebaseUrl}:signInWithPassword?key=${this.apiKey}`, {
      ...credentials, returnSecureToken: true
    }).pipe(catchError(this.errorHandler), tap(resData => {
      this.handleAuthenticated(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogOut(expirationDuration)
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(["auth"]);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer ){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logOut()
    },expirationDuration)
  }

  private handleAuthenticated(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage: string = "An unknown Error";

    if (!errorRes.error || !errorRes.error.error) return throwError(() => {
      return new Error(errorMessage);
    });

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator.";
        break;
    }
    return throwError(() => (new Error(errorMessage)));
  }
}
