import { IvyParser } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { IVehicle } from '../interfaces';
import { WebRequestService } from './web.requests.service';

@Injectable({
  providedIn: 'root'
})

export class VehiclesService {

  constructor(
     private _webRequestsSvc : WebRequestService
  ){  
  }
  
  async getAllVecicles() :Promise<IVehicle[]>{
    return <IVehicle[]>await this._webRequestsSvc.get('vehicles');
  }

  async createVehicle(vehicle : IVehicle) : Promise<IVehicle>{
    return <IVehicle>await this._webRequestsSvc.post('vehicles',vehicle) ;
  }

  async updateVehicle(id : string , updatedProps : Object) : Promise<IVehicle>{
    return <IVehicle>await this._webRequestsSvc.patch(`vehicles/${id}`,updatedProps) ;
  }

  async deleteVehicle(id : string){
    return  await this._webRequestsSvc.delete(`vehicles/${id}`)
  }
}
