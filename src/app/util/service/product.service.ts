import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private GET_ALL_URL = '/api/products';

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    const params = new HttpParams();
    return this.http.get<Product[]>(this.GET_ALL_URL,
      {
     params});
  }
  getAlProducts(query?: string, sort?: string, order?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (query) {
      params = params.append('query', query);
    }
    if (sort) {
      params = params.append('sort', sort);
    }
    if (order) {
      params = params.append('order', order);
    }
    return this.http.get<Product[]>(this.GET_ALL_URL, {
      params
    });
  }

  getProductsByName(name: string): Observable<Product[]> {
    const params = new HttpParams();
    params.append('/name', name);
    return this.http.get<Product[]>(this.GET_ALL_URL, {
      params});
  }
  getLastViewedProducts(ids: string[]): Observable<Product[]> {
    const body = JSON.stringify(ids);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers };
    return this.http.post<Product[]>(this.GET_ALL_URL + '/last-viewed', body, options);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.GET_ALL_URL + '/' + id);
  }
}
