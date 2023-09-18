import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ScrapeService } from 'src/services/scrape.service';

@Component({
  selector: 'app-scrape',
  templateUrl: './scrape.component.html',
  styleUrls: ['./scrape.component.css']
})
export class ScrapeComponent implements OnInit {

  formData: any = {input1: '', input2: ''};
  selectedType: string
  toRotateType: boolean
  selectedYear: number
  toRotateYear: boolean
  isSelectedType: boolean
  menuTypes: boolean
  menuYears: boolean
  types: string[]
  years: number[]
  message: string
  messageInput: string

  constructor(private scrapeService: ScrapeService, private dataService: DataService) {
    this.selectedType = "Izaberite tip ankete";
    this.toRotateType = false;
    this.selectedYear = new Date().getFullYear();
    this.toRotateYear = false;
    this.isSelectedType = false;
    this.menuTypes = false;
    this.menuYears = false;
    this.types = []
    this.years = []
    this.message = ''
    this.messageInput = '*Za preuzimanje sva polja moraju biti popunjena'
   }

  ngOnInit(): void {
    for(let i = this.selectedYear; i>=this.selectedYear-10; i--){
        this.years.push(i);
    }

    this.dataService.getTypes().subscribe((res: any)=> {
      this.types = res.list;
      console.log(this.types)
    })
  }

  scrape(): void{
    let faculty = localStorage.getItem('faculty');
    if(faculty === null){
      this.message = "Nema informacija o fakultetu kome pripadate."
      return;
    }
    this.scrapeService.startScrape(faculty, this.formData.input1, this.formData.input2, this.selectedType, this.selectedYear).subscribe(
      (res: any) => {
        // Handle the successful response here
        this.message = res.message;
      },
      (error: any) => {
        // Handle errors here
        this.message = error.error;
      }
    )
  }

  submitForm() {
    // Handle form submission logic here
    console.log('Form Data:', this.formData);
  }

  showTypes(): void{
    if(this.menuTypes == false){
      this.menuTypes = true;
      this.toRotateType=true;
    }
    else{
      this.menuTypes = false;
      this.toRotateType=false;
    }
  }

  showYears(): void{
    if(this.menuYears == false){
      this.menuYears = true;
      this.toRotateYear=true;
    }
    else{
      this.menuYears = false;
      this.toRotateYear=false;
    }
  }

  selectType(option: string): void{
    this.selectedType = option
    this.isSelectedType = true

    this.formData.input2 = "Anketa " + this.selectedType.split('_')[0].toLowerCase() + ' - ' + this.selectedType.split('_')[1].toLowerCase() + ' - ' + this.selectedYear
  }

  selectYear(option: number): void{
    this.selectedYear = option

    this.formData.input2 = "Anketa " + this.selectedType.split('_')[0].toLowerCase() + ' - ' + this.selectedType.split('_')[1].toLowerCase() + ' - ' + this.selectedYear
  }

  


}
