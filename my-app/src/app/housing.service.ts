import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { Auth } from './auth';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  url = "http://localhost:3000";
  //url = "https://laughing-waffle-qxqpjxp6wwf4554-3000.app.github.dev"

  constructor() { }

  async getAllHousingLocations() : Promise<HousingLocation[]>{
    const data = await fetch(this.url + "/housing");
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number) : Promise<HousingLocation | undefined>{
    const data = await fetch(this.url +"/housing/" + id);
    return await data.json() ?? {};
  }

  submitApplication(firstName: String, lastName: String, 
    email: String){
      console.log(firstName, lastName, email);
  }
  
}
