import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface AuthCredential {
  email: string,
  password: string
}

interface SignUpResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({providedIn: "root"})
export class AuthService {
  private apiKey: string = "AIzaSyDXNMZLb6dPBiKuHanP-Zyk_R9L-6OMGEg";

  constructor(private http: HttpClient) {
  }

  signUp(credentials: AuthCredential) {
    return this.http.post<SignUpResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      ...credentials,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
        let errorMessage: string = "An unknown Error";

        if (!errorRes || !errorRes.error.error) return throwError(() => {
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
        }
        return throwError(() => (new Error(errorMessage)));
      }
    ));
  }
}
