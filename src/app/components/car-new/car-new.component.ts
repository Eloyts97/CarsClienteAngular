import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Car } from 'src/models/car';
import { CarService } from '../../services/car.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
  public pageTitle: string;
  public identity;
  public token;
  public car: Car;
  public statusCar: string;
  public fileToUpload: File = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.pageTitle = 'Crear nuevo coche';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if (this.identity === null) {
      this._router.navigate(['/login']);
    } else {
      // Crear objeto coche
      this.car = new Car(1, '', '', 1, '', '', 1, '', '', '', '', '');
    }
  }

  onSubmit() {
    console.log(this.car);
    this._carService.create(this.token, this.car).subscribe(
      response => {
        this.car = response.car;
        this.statusCar = 'success';
        // this._router.navigate(['']);
      },
      error => {
        console.log(error);
        this.statusCar = 'error';
      }
    );
  }

  fileChangeEvent(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

}
