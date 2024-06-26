import { Component } from '@angular/core';
import { CarModelService } from '../services/carmodel.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Options } from '../../types/options';
import { ConfigService } from '../services/config.service';
import { FormsModule } from '@angular/forms';
import { Config } from '../../types/config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-config-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './selectCarConfig.component.html',
  styleUrl: './selectCarConfig.component.scss'
})
export class selectCarConfig {
  options?: Options;

  constructor(
    http: HttpClient,
    carModelService: CarModelService,
    private _optionService: ConfigService,
  ) {
    const url = '/options/' + carModelService.modelCode$.value;

    http.get<Options>(url).subscribe(options => this.options = options);
  }

  get config(): Config {
    const config = this.options!.configs.find(
      config => config.id === this.configId
    );

    if (config) return config;
    throw Error(`Config ${this.configId} not found!`);
  }

  get configId(): number {
    return this._optionService.configId;
  }

  // ngModel writes the value as a string
  set configId(id: string) {
    this._optionService.configId = parseInt(id);
    this._optionService.config = this.config;
  }

  get towHitch(): boolean {
    return this._optionService.towHitch;
  }

  set towHitch(value: boolean) {
    this._optionService.towHitch = value;
  }

  get yoke(): boolean {
    return this._optionService.yoke;
  }

  set yoke(value: boolean) {
    this._optionService.yoke = value;
  }
}
