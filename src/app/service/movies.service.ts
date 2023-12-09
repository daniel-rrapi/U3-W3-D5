import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl = environment.moviesUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getMovies() {
    return this.http.get(this.moviesUrl);
  }
}
