import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
  accedi(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe();
    } catch (error) {
      alert('login errato');
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
}
