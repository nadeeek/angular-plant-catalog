import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    
    handleError(error: HttpErrorResponse): Observable<never>{
        let errorMessage = 'An Unknown error occured!';

        if(error.error instanceof ErrorEvent){
            //Client-side errors
            errorMessage = `Client side error: ${error.error.message}`;
        } else {
            //Server-side errors
            errorMessage = `Server side error: ${error.status} - ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(()=> new Error(errorMessage));

    }
}