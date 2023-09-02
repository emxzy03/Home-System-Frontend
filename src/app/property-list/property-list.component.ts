import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HousingService } from '../services/housing.service';
import { IProperty } from '../Interface/IProperty.interface';
import { ActivatedRoute } from '@angular/router';
import { last, mergeWith } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent =1;
  properties: Array<IProperty>| any ;
  
  constructor(private route: ActivatedRoute, private housingService: HousingService){}
  
  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent = 2; //Mean we are on rent-property URL else we are on Base Url
    };
    this.housingService.getAllProperties(this.SellRent).subscribe(
    data => {
      this.properties = data;
      console.log(data)
    },error => {
      console.log('httperror:',error);
      console.log(error);
    }
  );

    // this.http.get('data/properties.json').subscribe(
    //   data => {
    //     this.properties = data;
    //     console.log(data)
    //   });
      
  }
}
