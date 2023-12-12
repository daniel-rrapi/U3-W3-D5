import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/service/movies.service';
import { Favourite } from 'src/app/models/favourite';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private moviesSrv: MoviesService) {}
  favourites!: Favourite[];
  idUtente: any;
  nomeUtente: any;
  movies!: Movie[];
  results: any;

  ngOnInit(): void {
    this.moviesSrv.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    });

    this.idUtente = localStorage.getItem('user');
    this.idUtente = JSON.parse(this.idUtente);
    this.idUtente = this.idUtente.user.id;

    this.nomeUtente = localStorage.getItem('user');
    this.nomeUtente = JSON.parse(this.nomeUtente);
    this.nomeUtente = this.nomeUtente.user.nome;

    this.moviesSrv.getFavourites(this.idUtente).subscribe((data) => {
      this.favourites = data;
      console.log(data);
      const filterByReference = (movies: any, fav: any) => {
        let res = [];
        res = movies.filter((el: any) => {
          return fav.find((element: any) => {
            return element.movieId === el.id;
          });
        });
        this.results = res;
        return res;
      };
      filterByReference(this.movies, this.favourites);
      console.log(this.results);
    });
  }
}
