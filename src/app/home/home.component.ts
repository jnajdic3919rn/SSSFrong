import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from 'src/services/google-auth.service';
import { Chart, registerables} from 'chart.js' 
import { ScrapeService } from 'src/services/scrape.service';
import { DataService } from 'src/services/data.service';
import { HistoryData } from 'src/models';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('searchElement', { static: false }) searchElement!: ElementRef;

  toRotate: boolean
  toRotateType: boolean
  toRotateSubject: boolean
  menu: boolean
  menuTypes: boolean
  menuSubject: boolean
  pos: boolean
  neg: boolean
  options: string[]
  types: string[]
  subjects: string[]
  selectedType: string
  isSelectedType: boolean
  selected: string
  isSelected: boolean
  selectedSubject: string
  isSelectedSubject: boolean
  subject: string
  positiveComments: string[]
  negativeComments: string[]
  positiveComments2: string[]
  negativeComments2: string[]
  isExtended: boolean 
  isExtendedScrape: boolean
  isScrolled: boolean
  chartAll: any
  chartComments: any
  searchTerm: string
  searchComment: string
  allSubjects: string[]
  votes: number
  grade: number
  numOfComments: number

  years: number[]
  comments: number[]
  grades: number[]
  votess: number[]
  negComments: number[]
  posComments: number[]

  message: string

  constructor(private activatedRoute: ActivatedRoute, private authService: GoogleAuthService, private router:Router, private scrapeService : ScrapeService, private dataService : DataService) { 
    this.menu = false;
    this.menuTypes = false;
    this.menuSubject = false;
    this.toRotate = false;
    this.toRotateType = false;
    this.toRotateSubject = false;
    this.pos = false;
    this.neg = true;
    this.options = [];
    this.subjects = [];
    this.selected = 'Izaberite anketu';
    this.isSelected = false;
    this.subject = '';
    this.isSelectedSubject = false;
    this.positiveComments = [];
    this.negativeComments = [];
    this.positiveComments2 = [];
    this.negativeComments2 = [];
    this.isExtended = false;
    this.isExtendedScrape = false;
    this.isScrolled = false;
    this.types = [];
    this.selectedType = 'Izaberite tip ankete';
    this.isSelectedType = false;
    this.selectedSubject = 'Izaberite predmet';
    this.searchTerm = '';
    this.searchComment = '';
    this.allSubjects = [];
    this.numOfComments = 0;
    this.votes = 0;
    this.grade = 0.0;

    this.years = [];
    this.comments = [];
    this.grades = [];
    this.votess = [];
    this.negComments = [];
    this.posComments = [];

    this.message = '*Za pregled sva polja moraju biti popunjena'

    Chart.register(...registerables);
  }

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code']; // Retrieve the value of the 'code' parameter
      if (code) {
        console.log('Code:', code);
        // Make an HTTP request to exchange the code for tokens
        this.authService.exchangeAuthCodeForAccessToken(code).subscribe((res : any)=>{
          console.log(res)
          // this.saveToFile(res, 'response.json');
          
          this.authService.exchangeForJwtToken(res.access_token).subscribe((res : any) => {
            localStorage.setItem('token', res.message);
            const tokenInfo = this.getDecodedAccessToken(res.message);
            localStorage.setItem('faculty', tokenInfo.faculty);
          })
        })
      }
    });

    this.dataService.getTypes().subscribe((res: any)=> {
      this.types = res.list;
      console.log(this.types)
    })
  }

  logout(): void{
    localStorage.clear();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  saveToFile(data: any, fileName: string) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  ngAfterViewChecked() {
      if(!this.isScrolled && this.isExtended){
        console.log('juhu')
        this.searchElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.isScrolled = true
      }
  }


  showMenu(): void{
    if(this.options.length === 0) {
      if(this.toRotate == true) this.toRotate = false
      else this.toRotate = true
      return
    }
    if(this.menu == false){
      this.menu = true;
      this.toRotate=true;
    }
    else{
      this.menu = false;
      this.toRotate=false;
    }
  }

  showMenuSubject(): void{
    if(this.subjects.length === 0) {
      if(this.toRotateSubject == true) this.toRotateSubject = false
      else this.toRotateSubject = true
      return
    }
    if(this.menuSubject == false){
      this.menuSubject = true;
      this.toRotateSubject=true;
    }
    else{
      this.menuSubject = false;
      this.toRotateSubject=false;
    }
  }

  showTypes(): void{
    if(this.types.length === 0){
      if(this.toRotateType == true) this.toRotateType = false
      else this.toRotateType = true
      return
    }
    if(this.menuTypes == false){
      this.menuTypes = true;
      this.toRotateType=true;
    }
    else{
      this.menuTypes = false;
      this.toRotateType=false;
    }
  }

  selectType(option: string): void{
    this.selectedType = option
    this.isSelectedType = true
    this.selected = 'Izaberite anketu';
    this.isSelected = false
    this.selectedSubject = 'Izaberite predmet';
    this.isSelectedSubject = false
    this.isExtended = false

    let faculty = localStorage.getItem('faculty');
    if(faculty === null){
      this.message = "Nema informacija o fakultetu kome pripadate."
      return;
    }
    
    this.dataService.getSurveys(this.selectedType, faculty).subscribe((res:any)=>{
      this.options = res.list;
    })
  }

  selectOption(option: string): void{
    this.selected=option
    this.isSelected = true;
    this.isExtended = false

    let faculty = localStorage.getItem('faculty');
    if(faculty !== null){

      this.dataService.getSubjects(this.selectedType, faculty, this.selected).subscribe((res:any)=>{
        this.allSubjects = res.list;
        this.subjects = this.allSubjects;
      })
    }
    else{
      this.message = "Nema informacija o fakultetu kome pripadate."
    }

  }

  selectSubject(option: string): void{
    this.selectedSubject=option
    this.subject=option
    this.isSelectedSubject = true;
    this.isExtended = false
  }

  onSearchTermChange(filter: string) {
    this.subjects = this.allSubjects.filter(item => item.startsWith(filter));
  }

  onSearchCommentChange(){
    let filter = this.searchComment
    this.positiveComments2 = this.positiveComments.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
    this.negativeComments2 = this.negativeComments.filter(item => item.toLowerCase().includes(filter.toLowerCase()));

  }

  search(): void{
    
    this.isScrolled = false
    this.isExtended = true;
    let faculty = localStorage.getItem('faculty');

    if(faculty === null){
      this.message = "Nema informacija o fakultetu kome pripadate."
      return;
    }

    this.dataService.getResults(this.selectedType, faculty, this.selected, this.selectedSubject).subscribe((res) => {
      this.positiveComments = res.positiveComments;
      if(this.positiveComments.length == 0) this.pos = true;
      this.negativeComments = res.negativeComments;
      if(this.negativeComments.length == 0) this.neg = true;
      this.positiveComments2 = this.positiveComments
      this.negativeComments2 = this.negativeComments

      this.votes = res.votes;
      this.grade = res.grade;
      this.numOfComments = res.numberOfComments;
      
      console.log("Pokusaj")
      for(let hd of res.historyData){
        this.years = hd.years;
        if(hd.type === 'votes')
          this.votess = hd.results;
        if(hd.type === 'grades')
          this.grades = hd.results;
        if(hd.type === 'comments')
          this.comments = hd.results
        if(hd.type === 'neg')
          this.negComments = hd.results
        if(hd.type === 'pos')
          this.posComments = hd.results
      }



      if (this.chartAll) {
        this.chartAll.destroy(); // Destroy the chart instance
      }
  
      if (this.chartComments) {
        this.chartComments.destroy(); // Destroy the chart instance
      }
  
      console.log(this.years)
        console.log(this.votess)
        console.log(this.grades)
        console.log(this.comments)
  
      this.chartAll = new Chart('canvas', {
        type:"line",
        data: {
          labels: this.years,
          datasets: [
            {
              label: 'Broj glasova',
              data: this.votess,
              borderColor: '#184E7D', 
              fill: false
            },
            {
              label: 'Prosečna ocena',
              data: this.grades,
              borderColor: '#F26419', 
              fill: false
            },
            {
              label: "Broj komentara",
              data: this.comments,
              borderColor: '#55DDE0', 
              fill: false
            }
  
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true, // Set to true to display the legend
              position: 'top', // Position of the legend ('top', 'bottom', 'left', 'right')
              labels: {
                color: '#333', // Set the color of legend labels
                font: {
                  size: 12 // Set the font size of legend labels
                }
              }
            },
            title: {
              display: true,
              text: 'Parametri po godinama', // Set the title text
              font: {
                size: 16
              }
            },
          },
          
        }
      })

      console.log(this.chartAll)


    this.chartComments = new Chart('canvas2', {
      type:"bar",
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'Pozitivni komentari',
            data: this.posComments,
            backgroundColor: '#184E7D'
          },
          {
            label: 'Negativni komentari',
            data: this.negComments,
            backgroundColor: '#F26419'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true, // Set to true to display the legend
            position: 'top', // Position of the legend ('top', 'bottom', 'left', 'right')
            labels: {
              color: '#333', // Set the color of legend labels
              font: {
                size: 12 // Set the font size of legend labels
              }
            }
          },
          title: {
            display: true,
            text: 'Broj pozitivnih i negativnih komentara po godinama', // Set the title text
            font: {
              size: 16
            }
          }
        }
      }
    })
      
    })

    

    

  }

}
