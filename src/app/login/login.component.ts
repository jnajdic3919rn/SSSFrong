import { Component, OnInit } from '@angular/core';
import { ScrapeService } from 'src/services/scrape.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleAuthService } from 'src/services/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  loggedIn: any;

  message: string
  color: string
  linkForm: FormGroup

  constructor(private router: Router, private authService : GoogleAuthService, private formBuilder : FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.message = ""
    this.color = "green"
    this.linkForm = this.formBuilder.group({
      url: ['', Validators.required],
  })
   }

  ngOnInit() {
    
  }

  login(): void{
    this.authService.login();
  }

  loginWithGoogle(): void{
    this.authService.loginWithGoogle();
  }

}
