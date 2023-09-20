import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from 'src/services/google-auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-legitimation',
  templateUrl: './legitimation.component.html',
  styleUrls: ['./legitimation.component.css']
})
export class LegitimationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService: GoogleAuthService, private router:Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if( token === null || token === ""){
      this.activatedRoute.queryParams.subscribe(params => {
        const code = params['code']; // Retrieve the value of the 'code' parameter
        if (code) {
          console.log(code)
          // Make an HTTP request to exchange the code for tokens
          this.authService.exchangeAuthCodeForAccessToken(code).subscribe((res : any)=>{
            // this.saveToFile(res, 'response.json');
            this.authService.exchangeForJwtToken(res.access_token).subscribe((res : any) => {
              localStorage.setItem('token', res.message);
              const tokenInfo = this.getDecodedAccessToken(res.message);
              localStorage.setItem('faculty', tokenInfo.faculty);
              localStorage.setItem('role', tokenInfo.roles[0]);

              this.router.navigate(['/survey'])
              
            })

          })
        }
        else{
          this.router.navigate(['/auth'])
        }
      });
    }
    else{
      this.router.navigate(['/survey'])
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
