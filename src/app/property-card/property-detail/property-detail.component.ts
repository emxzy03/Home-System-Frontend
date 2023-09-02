import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Property } from 'src/app/Interface/Property';
import { HousingService } from 'src/app/services/housing.service';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property = new Property();
  propy: Property | undefined;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private housingService: HousingService) { }
  
    ngOnInit() {
      this.propertyId = +this.route.snapshot.params['id'];
      this.route.data.subscribe(
        (data: Property | any) => {
          this.property = data['prp'];
        }
      )

    //   this.route.params.subscribe(
    //     (params) => {
    //       this.propertyId = +params['id'];
    //       this.housingService.getProperty(this.propertyId).subscribe(
    //         (data: Property | any) => {
    //           this.property = data;
    //         }
    //       );
    //     }
    //   );
     }
  }