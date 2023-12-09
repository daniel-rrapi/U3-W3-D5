import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any;
  constructor(private moviesSrv: MoviesService) {}

  ngOnInit(): void {
    this.moviesSrv.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    });
  }
}
