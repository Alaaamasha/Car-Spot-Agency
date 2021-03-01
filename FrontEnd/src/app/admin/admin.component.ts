import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { IVehicle } from '../interfaces';
import { VehiclesService } from '../services/vehicles.service';
import { clone } from 'lodash-es';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  expand:boolean = false;
  loader : boolean = false;

  allVehicles : IVehicle[] = []
  selectedValue : IUpdatedVehicle = {
    brand: '',
    year: '',
    model: '',
    price: 0,
    type: '',
    publishDate:new Date()
  }

  constructor(
    private _vehiclesSvc : VehiclesService,
    private _matDialog:MatDialog,
    private _router: Router
  ) { }

  async ngOnInit() {
    this.allVehicles = <IVehicle[]>await this._vehiclesSvc.getAllVecicles()
    
  }

  async deleteVehicle(vehicle : IVehicle){
    const { _matDialog } = this
    
    this.toggleLoader()
    try {
      let id = vehicle._id || '';
      let dialog = _matDialog.open(DeleteConfirmComponent,{
        data:{
          message : "Are you sure to delete "+ `${vehicle.brand}-${vehicle.model}`,
          confirmButtonText : 'Confirm',
          cancelButtonText : 'Cancel'
        }
      })
      dialog.afterClosed().subscribe(res =>{
        if(res && res.confirm==true){
          this.delete(id)
        }
      })
    } catch (error) {
      console.error(error); 
    }
    finally{
      this.toggleLoader()
    }
  }

  async delete(id:string){
    try {
      await this._vehiclesSvc.deleteVehicle(id)
      this.allVehicles = this.allVehicles.filter(v => v._id !== id)
    } catch (error) {
      console.error(error)
    }
  }


  togglePanel() {
    this.expand = !this.expand
  }

  toggleLoader() {
    this.loader = !this.loader
  }

  signOut(){
    this._router.navigate([''])
  }

  async editVehicle(vehicle : IVehicle){
    const { _matDialog } = this

    try {
      let copiedVal = clone(vehicle)
      let dialog = await _matDialog.open(AddVehicleComponent,{
        data:{
          vehicle : vehicle
        }
      })

      dialog.afterClosed().subscribe(results =>{
        let idx = this.allVehicles.findIndex(v=>v._id == vehicle._id)
        if(results && results.updatedEntity){
          this.allVehicles[idx] = results.updatedEntity
        }
        else{
          this.allVehicles[idx] = copiedVal;
        }
     })  
    } catch (error) {
        console.error(error)
    }
  }

  async addVehicle(){
    const { _matDialog } = this
    this.toggleLoader()
    
    try {
      let dialog = await _matDialog.open(AddVehicleComponent)
      dialog.afterClosed().subscribe(results =>{
          if(results && results.newEntity){
            this.allVehicles.unshift(<IVehicle>results.newEntity)
          }
      })
    } catch (error) {
      console.error(error); 
    }
    finally{
      this.toggleLoader()
    }
  }

}

interface IUpdatedVehicle{
  type : string,
  model : string,
  brand : string,
  year : string,
  price : number,
  publishDate?:Date
}