import { Component } from '@angular/core';
import { CarModelService } from '../services/carmodel.service';
import { ConfigService } from '../services/config.service';
import { Config } from '../../types/config';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Color } from '../../types/color';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  readonly OPTION_PRICE = 1000;
  modelDescription: string;
  config: Config;
  color: Color;
  towHitch: boolean;
  yoke: boolean;

  constructor(
    carModelService: CarModelService,
    optionService: ConfigService,
  ) {
    this.modelDescription = carModelService.carModel.description;
    this.config = optionService.config!;
    this.color = carModelService.color;
    this.towHitch = optionService.towHitch;
    this.yoke = optionService.yoke;
  }

  get totalCost(): number {
    let cost = this.config.price;

    cost += this.color.price;
    if (this.towHitch) cost += this.OPTION_PRICE;
    if (this.yoke) cost += this.OPTION_PRICE;

    return cost;
  }
}
