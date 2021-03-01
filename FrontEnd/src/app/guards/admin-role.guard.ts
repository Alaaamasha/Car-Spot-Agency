import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
    canActivate() {
      return true;
    }
}