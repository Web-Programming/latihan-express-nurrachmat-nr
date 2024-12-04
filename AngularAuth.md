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

        </div>
        <div>
            <label for="password" >Password</label>
            <input type="password" name="password" id="password" placeholder="Your Password Here" required formControlName="password" />
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

## Mengimplementasikan Register API
1. Buat **auth** interface
- Buat interface bernama auth dengan command `ng g i storage`

Isi script auth.ts:
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
- Buat variable `BROWSER_STORAGE` yang memaggil class InjectionToken dan localStorage
```js
import { InjectionToken } from "@angular/core";
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
})
```
> class storage digunakan untuk menyimpan token JWT yang dihasilkan oleh API
2. Panggil BROWSER_STORAGE di dalam constuctor menggunakan dependency injection pada authentication service
```js
constructor(
    @Inject(BROWSER_STORAGE) private storage:Storage
  ) { }
```
3. Buat Class User dengan property name dan email menggunakan command `ng g cl user`
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

4. Menginplementasikan method loginAuth pada login component
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

      this.authService.loginAuth(this.loginForm).then((res)=>{
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