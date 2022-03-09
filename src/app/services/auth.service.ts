import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    });
  }
}
