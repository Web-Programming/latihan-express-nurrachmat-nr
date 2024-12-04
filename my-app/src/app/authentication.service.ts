import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Auth } from './auth';
import { User } from './user';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) { }
  url = "http://localhost:3000";
  //url = "https://laughing-waffle-qxqpjxp6wwf4554-3000.app.github.dev"
  async submitRegister(registerdata : FormGroup) : Promise<Auth>{
    const data = await fetch(`${this.url}/users/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({... registerdata.value})
    });
    return await data.json() ?? {};
  }

  //untuk kebutuhan login
  async loginAuth(user: User): Promise<Auth> {
    const data = await fetch(`${this.url}/users/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return await data.json() ?? {};
  }

  //untuk mengambil token
  public getToken(): any {
    return this.storage.getItem("app-token");
  }

  //untuk menyimpan token
  public saveToken(token: string): void {
    this.storage.setItem("app-token", token);
  }

  //untuk kebutuhan login
  public isLoggedIn(): boolean {
    const token: string =  this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }else{
      return false;
    }
  }

  //untuk kebutuhan logout
  public logout(): void{
    this.storage.removeItem("app-token");
  }

  //untuk mengabil info user
  public getCurrentUser(): User | null {
    if(this.isLoggedIn()){
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null;
  }
}
