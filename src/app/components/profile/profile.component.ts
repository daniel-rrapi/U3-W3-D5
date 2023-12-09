import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private moviesSrv: MoviesService) {}
  favourites: any;
  idUtente!: any;
  movies: any;
  results: any;

  ngOnInit(): void {
    this.moviesSrv.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    });

    this.idUtente = localStorage.getItem('user');
    this.idUtente = JSON.parse(this.idUtente);
    this.idUtente = this.idUtente.user.id;

    this.moviesSrv.getFavourites(this.idUtente).subscribe((data) => {
      this.favourites = data;
      console.log(this.favourites);
    });

    this.movies.filter((m: any) => {
      this.favourites.includes(m);
    });
    console.log('risultato ', this.movies);
  }
}
