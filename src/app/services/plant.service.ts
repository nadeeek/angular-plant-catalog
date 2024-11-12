import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Plant } from '../models/plant.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = 'https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev';
  private offset = 0;
  private limit = 10;

  constructor(private httpClient: HttpClient) { }

  getPlants(): Observable<{ results: Plant[], next: string | null, count?: number }>{

    const url = `${this.apiUrl}?offset=${this.offset}&limit=${this.limit}`;

    this.offset += this.limit;

    return this.httpClient.get<{ results: Plant[], next: string | null, count: number }>(url).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );

  }

  getPlantDetails(id: any): Observable<Plant>{
    return this.httpClient.get<Plant>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  resetPagination(): void{
    this.offset = 0;
  }
}
