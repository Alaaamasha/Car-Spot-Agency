import { Input,Component, OnInit , Output, EventEmitter } from '@angular/core';

import { IVehicle } from '../interfaces';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicle : IVehicle = {
    brand:'',
    model:'',
    price:0,
    type:'',
    year:0,
    publish_date : new Date()
  } ; 

  @Output() backEvent = new EventEmitter<string>();
   
  constructor() {
  }

  ngOnInit(): void {
  }

  backToVehicles(){
    this.backEvent.emit('back');
  }

}
