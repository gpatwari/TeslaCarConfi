import { Injectable } from '@angular/core';
import { CarModelService } from '../services/carmodel.service';
import { Config } from '../../types/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configId = 0; 
  config: Config | null = null;
  
  towHitch = false;
  yoke = false;

  constructor(carModelService: CarModelService) {
    
    carModelService.modelCode$.subscribe(_ => {
      this.configId = 0;
      this.config = null;
      this.towHitch = false;
      this.yoke = false;
    });
  }
}
