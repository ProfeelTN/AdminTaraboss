import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthenticateRequest } from 'src/app/Models/Authenticate Request';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  email?: string;
  password?: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  login() {
   
    const request: AuthenticateRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (res: any) => {
        // console.log("response", res);
        // console.log("Message ==> ", res.body.message);
        if(res.body.message=="Invalid email or password"){
          // this.notifService.showError("Erreur", "Email ou mot de passe incorrect.");
        }
        if (res.body.status === 200) {
          localStorage.setItem('logged', "true");
          // console.log(res.body.token);
          this.authService.setToken(res.body.body.token);

          // Retrieve the user information
          this.authService.retrieveUserConnected(res.body.body.token).subscribe({
            next: (user: any) => {
              // console.log("User connected", user);
              const role = user.role;
              if (role) {
                this.authService.setRole(role);
              }
              // console.log('Role after login:', role);
              
              this.router.navigate(['/']).then(() => window.location.reload());
              
            },
            error: (err) => {
              // console.error('Error retrieving user connected:', err);
            }
          });
        }
      },
      error: (err) => {
        // console.error('Authentication failed:', err);
      },
    });
  }
}
