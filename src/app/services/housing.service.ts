import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IProperty } from '../Interface/IProperty.interface';
import { Property } from '../Interface/Property';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../Interface/IPropertybase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }
 
  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>('data/properties.json').pipe(
      map(data => {
        const propArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')||'{}');
  
        if (localProperties) {
          for (const id in localProperties) {
            if(SellRent){
            if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propArray.push(localProperties[id]);
            }
          } else{
             propArray.push(localProperties[id]);
          }
          }
        }
        
        for (const index in data ) {
          if(SellRent){
            if (data.hasOwnProperty(index) &&  data[index].SellRent === SellRent) {
             propArray.push(data[index]);
            }
         }else{
          propArray.push(data[index]);
          }
        }
        return propArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
    // return this.http.get<IProperty[]>('data/properties.json').pipe(
    //   map(data => {
    //     return Object.values(data).filter(property => property.SellRent === SellRent);
    //   })
    // );
  }
  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }
  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property,
                  ...JSON.parse(localStorage.getItem('newProp')!)];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }


  
  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+!localStorage.getItem('PID') + 1));
      return +!localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
