import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from 'src/models/car';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  styleUrls: ['../car-new/car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarEditComponent implements OnInit {
  public user: User;
  public car: Car;
  public pageTitle: string;
  public token;
  public statusCar;

  constructor(
    private _carService: CarService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this.getCar(id);
    });
  }

  getCar(id) {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._carService.getCar(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.car = response.car;
            console.log(this.car);
            this.pageTitle = 'Actualizar vehículo: ' + this.car.title;
          } else {
            this._router.navigate(['']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form) {
    console.log(this.car);
    this._carService.update(this.token, this.car, this.car.id).subscribe(
      response => {
        console.log(response);
        if (response.status === 'success') {
          this.statusCar = 'success';
          this.car = response.car;
          this._router.navigate(['/coche', this.car.id]);
        } else {
          this.statusCar = 'error';
        }
      },
      error => {
        console.log(error);
        this.statusCar = 'error';
      }
    );
  }

}
