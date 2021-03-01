import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IVehicle } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class WebRequestService {

  readonly ROOT_URL;
  constructor(private _http:HttpClient){  
    this.ROOT_URL = 'http://localhost:3000'  
  }

  get(uri : string){
      return this._http.get(`${this.ROOT_URL}/${uri}`)
      .toPromise()
      .then(entity => entity)
      .catch(err =>{
          console.error("Error in get() Function ");
          throw err
      })
  }

  post(uri : string , entity : IVehicle){
    return this._http.post<IVehicle>(`${this.ROOT_URL}/${uri}`,entity)
    .toPromise()
    .then(entity => entity)
    .catch(err =>{
        console.error("Error in post() Function ");
        throw err
    })
  }

  patch(uri : string , updatedEntity : Object){
    return this._http.patch(`${this.ROOT_URL}/${uri}`,updatedEntity)
    .toPromise()
    .then(entity => entity)
    .catch(err =>{
        console.error("Error in patch() Function ");
        throw err
    })
  }

  delete(uri : string){
    return this._http.delete(`${this.ROOT_URL}/${uri}`)
    .toPromise()
    .then(() => {})
    .catch(err =>{
        console.error("Error in delete() Function ");
        throw err
    })
  }

}