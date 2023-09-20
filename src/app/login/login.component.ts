import { Component, OnInit } from '@angular/core';
import { ScrapeService } from 'src/services/scrape.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleAuthService } from 'src/services/google-auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  loggedIn: any;

  email: string
  password: string

  message: string
  color: string
  linkForm: FormGroup

  constructor(private router: Router, private authService : GoogleAuthService, private formBuilder : FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.message = ""
    this.email = ""
    this.password = ""
    this.color = "green"
    this.linkForm = this.formBuilder.group({
      url: ['', Validators.required],
  })
   }

  ngOnInit() {
    
  }

  login(): void{
    this.authService.loginWithCredentials(this.email, this.password).subscribe(res => {
      localStorage.setItem("token",res.message);
      const tokenInfo = this.getDecodedAccessToken(res.message);
      localStorage.setItem('faculty', tokenInfo.faculty);
      localStorage.setItem('role', tokenInfo.roles[0]);
      this.router.navigate(['/survey'])
    },
    (error: any) => {
      this.message = error.error.error;
    });
  }

  loginWithGoogle(): void{
    this.authService.loginWithGoogle();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
