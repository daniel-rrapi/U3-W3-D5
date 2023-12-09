import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Movie } from 'src/app/models/movie';
import { Favourite } from '../models/favourite';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl = environment.moviesUrl;
  favouritesUrl = environment.favouritesUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getMovies() {
    return this.http.get<Movie>(this.moviesUrl);
  }

  getFavourites(id: number) {
    return this.http.get<Favourite>(`${this.favouritesUrl}${id}`);
  }
}
