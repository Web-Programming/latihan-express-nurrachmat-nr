## Membuat Component dan Router
1. Buat component register dan form register
- Kode lengkap template register.component.html
```html
<section class="register">
  <h1 class="auth-heading">Register to our platform</h1>
  <div class="alert-danger" *ngIf="formError">{{formError}}</div>
  <form [formGroup]="registerForm" (ngSubmit)="submitRegister()">
    <label for="name">Name</label>
    <input type="text" id="name" formControlName="name" placeholder="Input your name">
    <div
        *ngIf="name?.invalid && (name?.dirty || name?.touched)"
        class="alert-danger"
      >
      <div class="alert-danger" *ngIf="name?.errors?.['required']">Name is required.</div>
      <div class="alert-danger" *ngIf="name?.errors?.['minlength']">
        Name must be at least 2 characters long.
      </div>
    </div>

    <label for="email">Email</label>
    <input type="email" id="email" formControlName="email" placeholder="Input your email">
    <div
        *ngIf="email?.invalid && (email?.dirty || email?.touched)"
        class="alert-danger"
      >
      <div class="alert-danger" *ngIf="email?.errors?.['required']">Email is required.</div>
      <div class="alert-danger" *ngIf="email?.errors?.['email']">
        Email must be a valid email address
      </div>
    </div>


    <label for="password">Password</label>
    <input type="password" id="password" formControlName="password" placeholder="Input your password">
    <div
        *ngIf="password?.invalid && (password?.dirty || password?.touched)"
        class="alert-danger"
      >
      <div class="alert-danger" *ngIf="password?.errors?.['required']">Password is required.</div>
      <div class="alert-danger" *ngIf="password?.errors?.['minlength']">
        Name must be at least 6 characters long.
      </div>
    </div>
    <button type="submit" class="primary" [disabled]="registerForm.invalid">Register</button>
  </form>
</section>
```
- Lengkapi class register.component.ts
```ts
  registerForm: FormGroup;
  formError: String ="";
  
  //Inject class Router dan service authentication  

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Form submitted', formData);
      //Panggil method submitRegister()
    } else {
      this.formError = 'All fields are required, please try again';
      //console.log('Form is not valid');
    }
  }
```
2. Buat component login dan form login
- Lengkapi template login.component.html
``` html
<section>
    <h3 class="auth-heading">Login</h3>
    <div class="alert-danger" *ngIf="formError">{{formError}}</div>
    <form [formGroup]="loginForm"  (submit)="onLoginSubmit()">
        
        <div>
            <label for="email">Username</label>
            <input type="email" name="email" id="email" placeholder="name@gmail.com" required formControlName="email" />

            <div
              *ngIf="email?.invalid && (email?.dirty || email?.touched)"
              class="alert-danger"
            >
            <div class="alert-danger" *ngIf="email?.errors?.['required']">Email is required.</div>
            <div class="alert-danger" *ngIf="email?.errors?.['email']">
              Email must be a valid email address
            </div>
          </div>
        </div>
        <div>
            <label for="password" >Password</label>
            <input type="password" name="password" id="password" placeholder="Your Password Here" required formControlName="password" />

            <div
                *ngIf="password?.invalid && (password?.dirty || password?.touched)"
                class="alert-danger"
              >
              <div class="alert-danger" *ngIf="password?.errors?.['required']">Password is required.</div>
              <div class="alert-danger" *ngIf="password?.errors?.['minlength']">
                Name must be at least 6 characters long.
              </div>
            </div>
        </div>
        
        <button type="submit" class="primary">
            Sign in
        </button>
        <p >
            Don’t have an account yet?
            <a routerLink="/register" >Sign up</a>
        </p>
    </form>
</section>
```
- Lengkapi class login.component.ts
```ts
formError: String = "";
loginForm: FormGroup;

//Inject class Router dan service authentication  

constructor(private fb: FormBuilder){
  this.loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
}

get email() {
  return this.loginForm.get('email');
}

get password() {
  return this.loginForm.get('password');
}

public onLoginSubmit(): void{
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    console.log('Form submitted', formData);
    //Panggil method loginAuth()
    
  }else{
      this.formError = 'All fields are required, please try again';
  }
}
```
3. Buat route ke halaman **register** dan halaman **login**
```ts
{
    path:'register',
    component: RegisterComponent,
    title: 'Register Page'
},
{
    path:'login',
    component: LoginComponent,
    title: 'Login Page'
}
```

4. Lengkapi style css untuk component login dan resgister
``` css
.alert-danger{
  color: red;
  margin: 10px 0;
}

.auth-heading {
  font-size: 48pt;
  font-weight: bold;
  margin-bottom: 15px;
}

label, input {
  display: block;
}
label {
  color: var(--secondary-color);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12pt;
}
input {
  font-size: 16pt;
  margin-bottom: 15px;
  padding: 10px;
  width: 400px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid .3px;
}
@media (max-width: 1024px) {
  .listing-photo {
    width: 100%;
    height: 400px;
  }
}
```

## Mengimplementasikan Register API
1. Buat **auth** interface
- Buat interface bernama auth dengan command `ng g i storage`

Berikut script auth.ts:
```ts
export interface Auth {
    token : string | null,
    message : string | null
}
```
2. Buat **authentication** service
- Buat service bernama authentication dengan command `ng g s authentication`

3. Buat method **submitRegister** pada authentication service
```ts
url = "https://curly-space-telegram-q57jvq676h4w59-3000.app.github.dev"; 
async submitRegister(registerdata : FormGroup) : Promise<Auth>{
  const data = await fetch(`${this.url}/users/register`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({... registerdata.value})
  });
  return await data.json() ?? {};
}
```
> Sesuaikan nilai variable url dengan alamat url API anda!
4. Menginplementasikan method submitRegister pada register component
- Inject class Router dan service authentication menggunkan dependency injection
``` ts
router: Router = inject(Router);
authService: AuthenticationService = inject (AuthenticationService);
```
- Panggil method `authService.submitRegister` dari dalam method submitRegister()
```ts
submitRegister(): void {
  if (this.registerForm.valid) {
    const formData = this.registerForm.value;

    console.log('Form submitted', formData);
    this.authService.submitRegister(this.registerForm).then((res)=>{
      if(res.message != null){
        this.formError = res.message;
      }else if(res.token !=null){
        this.authService.saveToken(res.token);
        this.router.navigateByUrl('/');
      }else{
        this.formError = 'Register failed please try again';
      }
    });
  } else {
    this.formError = 'All fields are required, please try again';
    //console.log('Form is not valid');
  }
}
```

## Mengimplementasikan Login API
1. Buat **storage** interface
- Buat interface bernama storage menggunakan comman `ng g i storage`
- Buat variable `BROWSER_STORAGE` yang memanggil class InjectionToken dan localStorage
```js
import { InjectionToken } from "@angular/core";
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
})
```
> class storage digunakan untuk menyimpan token JWT yang dihasilkan oleh API

> Script tersebut membuat InjectionToken di Angular yang merepresentasikan akses ke browser storage (dalam hal ini localStorage). Tujuannya adalah memberikan cara standar untuk mengakses localStorage melalui dependency injection.
> 
> Di component atau service lain, token ini dapat digunakan seperti berikut:
``constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}``
>
> Hal ini memungkinkan akses ke localStorage melalui properti this.storage.

2. Panggil BROWSER_STORAGE di dalam constuctor menggunakan dependency injection pada authentication service
```js
constructor( @Inject(BROWSER_STORAGE) private storage:Storage ) { }
```
3. Buat Class User dengan property name dan email bertipe string menggunakan command `ng g cl user`
```ts
export class User {
  'email' : string;
  'name': string;
}
```
3. Buat method **getToken(), saveToken(), isLoggedIn(), logout() dan getCurrentUser()** pada authentication service
```ts
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
```

4. Menginplementasikan method *loginAuth* pada login component
- Inisiasi service authentication dan class Router menggunakan dependency injection
``` ts
router: Router = inject(Router);
authService: AuthenticationService = inject (AuthenticationService);
```
- Panggil method `authService.loginAuth` dari dalam method doLogin()
```ts
doLogin(): void {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    const user = {...this.loginForm.value} as User
    this.authService.loginAuth(user).then((res)=>{
      if(res.message != null){
        this.formError = res.message;
      }else{
        this.authService.saveToken(res.token);
        this.router.navigateByUrl('/');
      }
    });
  } else {
    this.formError = 'All fields are required, please try again';
    //console.log('Form is not valid');
  }
}
```

## Membuat Menu Navigasi dan Membatasi Akses 
1. Tambahkan Bootstrap di bagian head pada file index.html
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```

2. Tambahkan navbar menu pada template component *app.component.html*

``` html
<nav class="navbar navbar-expand-lg" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <img src="logo.svg" height="60" class="navbar-brand brand-logo">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" routerLinkActive="activebutton" ariaCurrentWhenActive="page" routerLink="/">Home</a>
        </li>
      </ul>
      <div *ngIf="isLoggedIn(); then loggedIn else loggedOut"></div>
        <ng-template #loggedIn>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" (click)="doLogout()">Logout</a>
            </li>
          </ul>
        </ng-template>
      
        <ng-template #loggedOut>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/login" routerLinkActive="activebutton" ariaCurrentWhenActive="page">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/register" routerLinkActive="activebutton" ariaCurrentWhenActive="page">Register</a>
            </li>
          </ul>
        </ng-template>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            {{ getUsername() }}
          </li>
        </ul>
    </div>
  </div>
</nav>
```
> *ngIf="isLoggedIn(); then loggedIn else loggedOut":
Mengevaluasi fungsi isLoggedIn(). Jika fungsi ini mengembalikan nilai true, maka template #loggedIn akan dirender. Jika false, template #loggedOut akan dirender.

> Angular memutuskan apakah akan menampilkan template #loggedIn atau #loggedOut berdasarkan hasil dari fungsi isLoggedIn().

> Navigasi dan aksi login/logout diatur secara dinamis sesuai status login pengguna.

> Jika login: Tombol "Logout" akan terlihat. Sebaliknya, jika tidak login: Tombol "Login" dan "Register" akan terlihat.
3. Inject Router dan authentication service pada component *app.component.ts*
``` ts
  router: Router = inject(Router)
  authenticationService: AuthenticationService = inject(AuthenticationService)
```
4. Buat Method *isLoggedIn(), doLogout() dan getUsername()
``` ts
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
```

## Membatasi Akses Route
1. Buat guard dengan nama **auth** dengan command `ng g g auth-guard` dan pilih CanActivate pada pilihan type guard yang akan dibuat
2. Lengkapi **authGuard** untuk memeriksa kondisi *isLoggedIn()* dari authentication service
``` ts
export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```
3. Batasi akses ke alamat tertentu dengan menambahkan property ``canActivate: [authGuardGuard]``
Contoh pada router detail :
``` ts
{
  path: 'details/:id',
  component: DetailsComponent,
  title: 'Details Page',
  canActivate: [authGuardGuard]
}
```