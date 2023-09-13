import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>('http://192.168.7.150:3000/tasks');
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`http://192.168.7.150:3000/tasks/${id}`);
  }

  postTask(new_task: any): Observable<any> {
    console.log('data post', new_task);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post('http://192.168.7.150:3000/tasks/post', new_task, {
      headers,
    });
  }

  putTask(id: number, new_task: any): Observable<any> {
    // console.log('data update', new_task);
    return this.http.put(`http://192.168.7.150:3000/tasks/${id}`, new_task);
  }
}
