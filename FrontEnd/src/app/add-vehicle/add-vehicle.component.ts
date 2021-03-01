import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IVehicle } from '../interfaces';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  vehcileDetailsFrm: FormGroup = this._formBuilder.group({
    type : ['',Validators.required],
    brand : ['',Validators.required],
    model : ['',Validators.required],
    year : [Validators.required],
    price : [Validators.required]
  });

  mode : string = ""

  updatedVehicle : IVehicle = <IVehicle>{
    type : '',
    brand :'',
    _id : '',
    model :'',
    year :0,
    price :0
   }

  constructor(
    private _formBuilder: FormBuilder,
    private _vehiclesSvc: VehiclesService,
    public dialogRef: MatDialogRef<AddVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {vehicle : IVehicle },
  ) { }

  ngOnInit(): void {
    if(this.data && this.data.vehicle){
      this.updatedVehicle = this.data.vehicle
      this.mode = "Update"
    }
    else{
      this.mode = "Add"
    }
  }

  async onSubmit(){
    const { vehcileDetailsFrm , dialogRef ,_vehiclesSvc } = this ;

    if(vehcileDetailsFrm.valid){
      if(this.mode == "Add"){
        let v = await _vehiclesSvc.createVehicle(<IVehicle>{
          brand : vehcileDetailsFrm.value.brand,
          model : vehcileDetailsFrm.value.model,
          price : vehcileDetailsFrm.value.price,
          type : vehcileDetailsFrm.value.type,
          year : vehcileDetailsFrm.value.year
      })  
       dialogRef.close({newEntity : v})
      }
      else{
        let id = this.updatedVehicle._id || ''
        let v = await _vehiclesSvc.updateVehicle(id,<IVehicle>{
          brand : vehcileDetailsFrm.value.brand,
          model : vehcileDetailsFrm.value.model,
          price : vehcileDetailsFrm.value.price,
          type : vehcileDetailsFrm.value.type,
          year : vehcileDetailsFrm.value.year
        })

        dialogRef.close({updatedEntity : this.updatedVehicle})
      }
    } 
    else{
      alert("You should Fill The Form")
    }
  }

}

interface InewVehicle{
  type : string
  brand : string
  model : string
  year  : number
  price : number 
}
