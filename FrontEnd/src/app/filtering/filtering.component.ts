import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { uniqBy as _uniqBy } from 'lodash-es'

import { IVehicle } from '../interfaces';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent implements OnInit {

  types : string[] = []
  brands : string[] = []
  models : string[] = []
  years : number[] = []
  selectedValue : IFilrtesSelected = {
    brand: '',
    dateRange: {
      from: 0,
      to: 0
    },
    model: '',
    price: 0,
    type: ''
  }

  constructor(
    private _dialogRef: MatDialogRef<FilteringComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {currentFilter : { filter:string , data:any }},
    private _vehiclesSvc : VehiclesService
  ) { }
  

  async ngOnInit(){
    const { _vehiclesSvc , selectedValue} = this
    
    try {
      let allVehicles = <IVehicle[]>await _vehiclesSvc.getAllVecicles();

    let types = allVehicles.map(v => v.type)
    this.types = _uniqBy(types,(v)=>{
      return v
    })
    let brands = allVehicles.map(v => v.brand)
    this.brands = _uniqBy(brands,(v)=>{
      return v
    })
    let models = allVehicles.map(v => v.model)
    this.models = _uniqBy(models,(v)=>{
      return v
    })
    let years = allVehicles.map(v => v.year)
    years.sort((y1,y2)=>  y1-y2 )
    this.years = _uniqBy(years,(v)=>{
      return v
    })

    if(this.data.currentFilter){
      let value = this.data.currentFilter
      switch(value.filter){ 
      case 'years':
        selectedValue.dateRange = value.data
      break;
      case 'brand':
        selectedValue.brand = value.data;
      break;

      case 'model':
        selectedValue.model = value.data
      break;
      case 'price':
        selectedValue.price = value.data
      break;

      case 'type':
        selectedValue.type = value.data
      break;
      
      case 'publishDate':
        selectedValue.publishDate = value.data
      break;
      }
    }  
    } 
    catch (error) {
      console.error(error) 
    }
  }

  apllyFilter(action : string ){
    const { _dialogRef , selectedValue } = this

    if(action == 'apply'){
      if(selectedValue.type){
        _dialogRef.close({filter:'type' , data:selectedValue.type})
        return;
      }
      if(selectedValue.brand){
        _dialogRef.close({filter:'brand' , data:selectedValue.brand})
        return;
      }
      if(selectedValue.model){
        _dialogRef.close({filter:'model' , data:selectedValue.model})
        return;
      }
      if(selectedValue.price){
        _dialogRef.close({filter:'price' , data:selectedValue.price})
        return;
      }
      if(selectedValue.publishDate){
        _dialogRef.close({filter:'publishDate' , data:selectedValue.publishDate})
        return;
      }
      if(selectedValue.dateRange.from && selectedValue.dateRange.to){
        _dialogRef.close({filter:'years' , data:selectedValue.dateRange})
       return;
      }
    }
    else{
      _dialogRef.close({filte : 'nofilter'})
    }
    
  }
  
  dateChanged(event:MatDatepickerInputEvent<Date>){
    let d = event.value || '';
    this.selectedValue.publishDate = new Date(d.toString())
  }
  
}

interface IFilrtesSelected{
  type : string,
  model : string,
  brand : string,
  dateRange :{
    from : number,
    to : number
  },
  price : number,
  publishDate?:Date
}