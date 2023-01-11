import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private readonly api: string = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol='

  constructor(
    public http: HttpClient
  ) { }


  private addHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'fc3161d3cfmsh7b78da7b6461751p1055eajsn618de7e49925',
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    });

    return headers;
  }

  GetActiveVariation(active: string): Observable<any> {
    const headers = this.addHeaders();
    const url = `${this.api}${active}&range=1mo&region=BR`;
    return this.http.get<any>(url, { headers });
  }

}  
