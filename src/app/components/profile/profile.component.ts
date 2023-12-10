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
  favourites: any;
  idUtente!: any;
  movies: any;
  results: any;
  map2: any;
  movieIds: any;

  ngOnInit(): void {
    this.moviesSrv.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    });

    this.idUtente = localStorage.getItem('user');
    this.idUtente = JSON.parse(this.idUtente);
    this.idUtente = this.idUtente.user.id;

    this.moviesSrv.getFavourites(this.idUtente).subscribe((data) => {
      console.log(data);
      this.favourites = data;
      this.movieIds = this.favourites.map((item: any) => {
        item.movieId;
      });
      this.results = this.movies.filter((item: any) => {
        this.movieIds.includes(item.id);
      });
      console.log(this.results);
    });
  }
}
