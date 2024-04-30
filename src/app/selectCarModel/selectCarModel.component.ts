import { Component } from '@angular/core';
import { Model } from '../../types/model';
import { CarModelService } from '../services/carmodel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color } from '../../types/color';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-model-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './selectCarModel.component.html',
  styleUrl: './selectCarModel.component.scss'
})
export class selectCarModelComponent {
  #modelCode: string;

  constructor(private carModelService: CarModelService) {
    this.#modelCode = this.carModelService.modelCode$.value;
  }

  get models(): Model[] {
    return this.carModelService.carModels;
  }

  get colors(): Color[] {
    return this.carModelService.colors;
  }

  get modelCode(): string {
    return this.#modelCode;
  }

  set modelCode(value: string) {
    this.#modelCode = value;
    this.carModelService.modelCode$.next(value);
  }

  get colorCode(): string {
    return this.carModelService.colorCode;
  }

  set colorCode(value: string) {
    this.carModelService.colorCode = value;
  }
}
