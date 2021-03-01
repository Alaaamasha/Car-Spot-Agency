import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private _router: Router
  ) { }
  
  user : IUser = {
    password : '',
    userName :''
  }
  ngOnInit(): void {
  }

  signIn(){
    this._router.navigate(['admin'])
  }

  goBack(){
    this._router.navigate([''])
  }

}

interface IUser{
  userName : string,
  password : string
}
