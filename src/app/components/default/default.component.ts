import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from 'src/models/car';
import { OwlModule } from 'ngx-owl-carousel';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit {
  public title: string;
  public cars: Array<Car>;
  public carsOffer: Array<Car>;
  public token;
  public identity;
  public SlideOptions: {};

  constructor(
    private _carService: CarService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Listado de vehículos';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getCars();
    this.getCarsOffers();
    this.SlideOptions = {
      items: 2,
      dots: true,
      nav: false,
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:2
        }
    }
    };
  }

  getCars() {
    this._carService.getCars().subscribe(
      response => {
        console.log(response);
        if (response.status === 'success') {
          this.cars = response.cars;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getCarsOffers() {
    this._carService.getCarsOffers().subscribe(
      response => {
        if (response.status === 'success') {
          this.carsOffer = response.carsOffers;
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteCar(id) {
    this._carService.delete(this.token, id).subscribe(
      response => {
        this._router.navigate(['']);
        if (response.status === 'success') {
          console.log('Vehículo borrado correctamente');
          this.getCars();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
