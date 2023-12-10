import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any;
  btnclass: string = 'btn btn-outline-primary';
  idUtente: any;
  favourites: any;

  constructor(private moviesSrv: MoviesService) {}

  ngOnInit(): void {
    this.idUtente = localStorage.getItem('user');
    this.idUtente = JSON.parse(this.idUtente);
    this.idUtente = this.idUtente.user.id;

    this.moviesSrv.getMovies().subscribe((data) => {
      this.movies = data;
      console.log('movies: ', this.movies);
    });

    this.moviesSrv.getFavourites(this.idUtente).subscribe((data) => {
      this.favourites = data;
      console.log('preferiti ', this.favourites);
    });
  }

  aggiungiFavorito(movieObj: any) {
    this.moviesSrv
      .addFavourites(this.idUtente, movieObj.id)
      .subscribe((data) => {});
    console.log(movieObj.id);
  }
}
