import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(url: string, queryParams?: HttpParams) {
    const options = { params: queryParams };

    return this.http.get(url, options);
  }

  getDataLogin(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  postDataLogin(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  getJson<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  putData(url: string, data: any) {
    return this.http.put(url, data);
  }
  postData(url: string, data: any) {
    return this.http.post(url, data);
  }

  postDataWithHeaders(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  updateData(url: string, data: any) {
    return this.http.post(url, data);
  }

  deleteData(url: string) {
    return this.http.delete(url);
  }

  downloadFileData(url: string, data: any) {
    return this.http.post(url, data, {
      responseType: "blob", // Important for handling binary data (e.g., files)
      observe: "response" // To access the full response, including headers
    });
  }
}
