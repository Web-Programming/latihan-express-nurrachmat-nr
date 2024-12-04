import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { User } from './user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  router: Router = inject(Router)
  authenticationService: AuthenticationService = inject(AuthenticationService)

  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
  }

  public doLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

  public getUsername(): string {
    const user : User | null = this.authenticationService.getCurrentUser();
    return user ? user.name : 'Guest';
  }
}
