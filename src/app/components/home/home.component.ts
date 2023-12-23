import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private mvsSrv: MoviesService) {}
  movieCarousel1: string = '';
  movieCarousel2: string = '';
  movieCarousel3: string = '';
  ngOnInit(): void {
    this.mvsSrv.getMovies().subscribe((res) => {
      console.log(res);
      this.movieCarousel1 = res[0].poster_path;
      this.movieCarousel2 = res[1].poster_path;
      this.movieCarousel3 = res[2].poster_path;
    });
  }
}
