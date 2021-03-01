import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FilteringComponent } from '../filtering/filtering.component';
import { IVehicle } from '../interfaces';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})

export class VehiclesComponent implements OnInit {

  allVehicles : IVehicle[] = []
  viewedVehicles : IVehicle[] = []
  typeView : string = ''
  sort_by : string = ''
  storage = window.localStorage;
  filter : string =''
  filterData : any 
  detailsMode : boolean = false
  selctedVehicle : IVehicle ={
    brand:'',
    model:'',
    price:0,
    type:'',
    year:0,
    publish_date : new Date()
  }

  constructor(
    private _vehiclesSvc: VehiclesService,
    private _matDialog:MatDialog,
    private _router: Router,
    
  ) { }

  async ngOnInit() {
    const { _vehiclesSvc , storage } = this
    
    try {
      this.allVehicles = await _vehiclesSvc.getAllVecicles();
      this.viewedVehicles = this.allVehicles;
    
      if(storage.getItem("sortFormat")){
        let sformat =storage.getItem("sortFormat") || '' 
        this.sort(sformat)
      }

      if(storage.getItem("viewFormat")){
        let vformat = storage.getItem("viewFormat")
        this.changeView({index : vformat})
      }
    } catch (error) {
      console.error(error)
    }   
  }

  async OpenFiltersDialog(){
    const { _matDialog , allVehicles } = this

    try {
      let dialog = await _matDialog.open(FilteringComponent , {
        data:{
          currentFilter:this.filter=='' ? '':{
            filter:this.filter,
            data : this.filterData
          }
        }
      })
  
      dialog.afterClosed().subscribe(results =>{
        if(results){
          this.filter = results.filter
          this.filterData = results.data
          switch(results.filter){
            case 'type':
              this.viewedVehicles = allVehicles.filter(v=>{
                return v.type==results.data
              })
            break;
              
            case 'brand':
              this.viewedVehicles = allVehicles.filter(v=>{
                return v.brand==results.data
              })
            break;
                
            case 'model':
              this.viewedVehicles = allVehicles.filter(v=>{
                return v.model==results.data
              })
            break;
                  
            case 'price':
              this.viewedVehicles = allVehicles.filter(v=>{
                return v.price==results.data
              })
            break;
                    
            case 'years':
              this.viewedVehicles = allVehicles.filter(v=>{
                if(v.year >= results.data.from && v.year <= results.data.to)
                  return true;
                return false
              })
            break;
                      
            case 'publishDate':
              this.viewedVehicles = allVehicles.filter(v=>{
                return new Date(v.publish_date) > results.data.getTime()
              })
            break;

            default:
              this.filter = ''
              this.filterData = null  
              this.viewedVehicles = allVehicles
          }
          this.sort(this.sort_by)
        }

      })  
    } catch (error) {
      console.error(error)
    }

  }

  changeView(value:any){
    this.storage.setItem("viewFormat",value.index)
    value.index == 0 ? this.typeView ='list' : this.typeView ='tiles' 
  }

  openVehicleDetails(v: IVehicle){
    this.selctedVehicle = v;
    this.detailsMode = true
  }

  backEvent(){
    this.detailsMode = false
  }

  sort(sortBy:string){
    if(sortBy){
      this.sort_by = sortBy
      sortBy == 'by_price' ? this.viewedVehicles.sort((v1,v2) => v2.price - v1.price )
                           : this.viewedVehicles.sort((v1,v2) => v2.year - v1.year )   
      this.storage.setItem("sortFormat",sortBy)
    }
  }

  openLoginPage(){
    this._router.navigate(['login'])
  }

}
