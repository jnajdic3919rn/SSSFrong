import { Component } from '@angular/core';
import { ScrapeService } from 'src/services/scrape.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthService } from 'src/services/google-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-finalexam';

  user: any;
  loggedIn: any;

  message: string
  color: string
  linkForm: FormGroup

  constructor(private scrapeService : ScrapeService, private formBuilder : FormBuilder, private http: HttpClient, private route: ActivatedRoute, private googleAuth:GoogleAuthService) {
    this.message = ""
    this.color = "green"
    this.linkForm = this.formBuilder.group({
      url: ['', Validators.required],
  })
   }

  ngOnInit() {
    

  }

  
}


