import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any;
  favourites: any;
  favouritesComplete: any;
  btnclass: string = 'btn btn-outline-primary';
  idUtente: any;

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
      const filterByReference = (movies: any, fav: any) => {
        let res = [];
        res = movies.filter((el: any) => {
          return fav.find((element: any) => {
            return element.movieId === el.id;
          });
        });
        this.favouritesComplete = res;
        return res;
      };
      filterByReference(this.movies, this.favourites);
      console.log(this.favouritesComplete);
    });
  }
  ngOnChanges() {}
  setFavouriteBtn(movieObj: any) {
    let presente = this.favouritesComplete.some(
      (oggetto: any) => oggetto.id === movieObj.id
    );

    if (presente) {
      return 'btn btn-danger';
    } else {
      return 'btn btn-outline-danger';
    }
  }

  checkFavourite(movieObj: any) {
    let presente = this.favouritesComplete.some(
      (oggetto: any) => oggetto.id === movieObj.id
    );
    if (presente) {
      console.log('cè: eliminazione in corso...');
      let oggettoCorrispondente = this.favourites.find(
        (oggetto: any) =>
          oggetto.userId === this.idUtente && oggetto.movieId === movieObj.id
      );
      console.log('ogg corrispondente ', oggettoCorrispondente);
      this.moviesSrv
        .deleteFavourites(oggettoCorrispondente.id)
        .subscribe((data) => {});
    } else {
      console.log('nn cè: aggiunta in corso...');
      this.moviesSrv
        .addFavourites(this.idUtente, movieObj.id)
        .subscribe((data) => {});
    }
    console.log(movieObj);
  }
}
