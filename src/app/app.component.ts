import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { selectModelViewer } from './selectModelViewer/selectModelViewer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { CarModelService } from './services/carmodel.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    selectModelViewer,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeRoute = 0;
  readonly routes = [
    {id:'step1',path:'/select-model'},
    {id:'step2',path:'/select-config'},
    {id:'step3',path:'/summary'},
  ];

  constructor(
    private carModelService: CarModelService,
    private _configService: ConfigService,
  ) { }

  isDisabled(route: string): boolean {
    switch (route) {
      case '/select-config':
        return this.carModelService.modelCode$.value === '';
      case '/summary':
        return this._configService.configId === 0;
      default:
        return false;
    }
  }
}
