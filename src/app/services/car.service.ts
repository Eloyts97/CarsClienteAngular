import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Car } from '../../models/car';

@Injectable()
export class CarService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    pruebas() {
        return 'Hola mundo';
    }

    create(token, car: Car): Observable<any> {
        const json = JSON.stringify(car);
        const params = 'json=' + json;
        const cabecera = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.post(this.url + 'cars', params, {headers: cabecera});
    }

    getCars(): Observable<any> {
        const cabecera = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'cars', {headers: cabecera});
    }

    getCarsOffers(): Observable<any> {
        const cabecera = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'offers', {headers: cabecera});
    }

    getCar(id): Observable<any> {
        return this._http.get(this.url + 'cars/' + id);
    }

    update(token, car, id): Observable<any> {
        const json = JSON.stringify(car);
        const params = 'json=' + json;
        const cabecera = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'cars/' + id, params, {headers: cabecera});
    }

    delete(token, id): Observable<any> {
        const cabecera = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url + 'cars/' + id, {headers: cabecera});
    }

}
