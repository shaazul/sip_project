import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environments.development";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authCheckUrl = environment.apiEndPoint + "/authcheck";
  loginUrl = environment.apiEndPoint + environment.api_base + "/login";
  meUrl = environment.apiEndPoint + environment.api_base + "/me";
  logoutUrl = environment.apiEndPoint + environment.api_base + "/logout";
  loginLinkUrl = environment.apiEndPoint + environment.api_base + "/login/link";
  redirectUrl = `${environment.routeToLogin}/auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  async intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<Observable<HttpEvent<any>>> {
    const token:any = localStorage.getItem("token");
    const parsedToken = JSON.parse(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${parsedToken.value}`
        }
      });
    }
    return next.handle(request);
  }

  /**
   * Generate a one-time login link from the backend.
   * The backend expects the authenticated user (via Bearer token) and an email in FormData.
   */
  createLoginLink(email: string): Observable<{ link: string } | any> {
    const form = new FormData();
    form.append('email', email);
    return this.http.post(this.loginLinkUrl, form);
  }

  /** Get the current user's email from localStorage (populated by me()). */
  getUserEmail(): string | null {
    try {
      const raw = localStorage.getItem('userData');
      if (!raw) return null;
      const user = JSON.parse(raw);
      return user?.email || user?.data?.email || null;
    } catch {
      return null;
    }
  }

  login(username: string, password: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.post(this.loginUrl, { email: username, password }).subscribe({
        next: (resp: any) => {
          const token = this.extractTokenFromResponse(resp);
          if (token) {
            this.storeToken(token);
            observer.next({ token });
            observer.complete();
          } else {
            observer.error(new Error('Login response did not contain a token'));
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }

  me(): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.get(this.meUrl).subscribe({
        next: (resp: any) => {
          try {
            const normalized = this.normalizeUser(resp);
            localStorage.setItem('userData', JSON.stringify(normalized));
          } catch {
            // fall back to storing raw response
            localStorage.setItem('userData', JSON.stringify(resp));
          }
          observer.next(resp);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  logout() {
    const accessToken = this.getTokenString();
    if (!accessToken) {
      localStorage.clear();
      window.location.href = this.redirectUrl;
      return;
    }

    this.logoutServer(accessToken)
      .pipe(
        catchError(() => {
          return throwError(() => {});
        })
      )
      .subscribe(data => {
        // Treat any successful call as a valid logout
        localStorage.clear();
        window.location.reload();
        window.location.href = this.redirectUrl;
      });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getTokenString(): string | null {
    const stored = this.getToken();
    if (!stored) return null;
    try {
      const maybeJson = JSON.parse(stored as string);
      return (maybeJson && typeof maybeJson === 'object' && 'value' in maybeJson) ? maybeJson.value : null;
    } catch {
      return stored as string;
    }
  }

  isLoggedIn() {
    const stored = this.getToken();
    if (!stored) {
      return false;
    }

    let token: string | null = null;
    // Support either raw JWT string, or JSON object { value: string }
    try {
      const maybeJson = JSON.parse(stored as string);
      token = (maybeJson && typeof maybeJson === 'object' && 'value' in maybeJson) ? maybeJson.value : null;
    } catch {
      token = stored;
    }

    if (!token || token === 'null' || token === 'undefined') {
      return false;
    }

    // If token looks like a JWT, validate expiration
    if (token.includes('.')) {
      try {
        const payloadPart = token.split('.')[1];
        const payloadJson = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
        if (payloadJson && payloadJson.exp) {
          const nowInSeconds = Math.floor(Date.now() / 1000);
          if (payloadJson.exp < nowInSeconds) {
            return false;
          }
        }
      } catch {
        // If we cannot parse it as JWT, consider it invalid
        return false;
      }
      return true;
    }

    // Non-JWT token: require presence of userData to treat as logged-in
    const userData = localStorage.getItem('userData');
    return Boolean(userData);
  }

  logoutServer(accessToken: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${accessToken}`);
    // Backend expects POST for logout
    return this.http.post(this.logoutUrl, {}, { headers });
  }

  private storeToken(token: string) {
    // Store plain string for widest compatibility
    try {
      localStorage.setItem('token', token);
    } catch {
      // fallback to JSON format used elsewhere in code
      localStorage.setItem('token', JSON.stringify({ value: token }));
    }
  }

  private extractTokenFromResponse(resp: any): string | null {
    if (!resp) return null;
    // Common patterns
    if (typeof resp === 'string') return resp;
    if (resp.access_token) return resp.access_token;
    if (resp.token) return resp.token;
    if (resp.data && resp.data.token) return resp.data.token;
    if (resp.result && resp.result.token) return resp.result.token;
    // Some APIs return token in headers; not accessible here
    return null;
  }

  private normalizeUser(raw: any): any {
    const user = raw && raw.data ? raw.data : raw;
    if (!user) return raw;
    // Ensure a permissions array of objects with name field exists
    const permissions = (user.permissions || user.scopes || user.roles || []).map((p: any) => {
      if (typeof p === 'string') return { name: p };
      if (p && typeof p === 'object') {
        if ('name' in p) return { name: p.name };
        const key = Object.keys(p)[0];
        return { name: key ? p[key] : '' };
      }
      return { name: '' };
    });
    return { ...user, permissions };
  }
}
