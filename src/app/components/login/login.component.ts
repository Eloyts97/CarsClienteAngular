import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public token;
  public identity;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Iniciar sesión';
    this.user = new User(1, 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(user) {
    this._userService.signup(this.user).subscribe(
      response => {
        // Objeto usuario identificado
        // console.log(response);
        if (response.status !== 'error') {
          this.identity = response;
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Token
          this._userService.signup(this.user, true).subscribe(
            response => {
              // console.log(response);
              this.token = response;
              localStorage.setItem('token', this.token);

              // Redirección
              this._router.navigate(['home']);
            },
            error => {
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];
      console.log(logout);

      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirección
        this._router.navigate(['home']);
      }
    });
  }

}
