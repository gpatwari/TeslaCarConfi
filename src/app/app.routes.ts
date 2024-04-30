import { Routes } from '@angular/router';

import { selectCarModelComponent } from './selectCarModel/selectCarModel.component';
import { selectCarConfig } from './selectCarConfig/selectCarConfig.component';
import { SummaryComponent } from './summary/summary.component';
import { inject } from '@angular/core';
import { CarModelService } from './services/carmodel.service';
import { ConfigService } from './services/config.service';

export const routes: Routes = [
  { path: 'select-model', component: selectCarModelComponent },
  {path: 'select-config', component: selectCarConfig, canActivate: [() => inject(CarModelService).modelCode$.value.length > 0] },
  {path: 'summary', component: SummaryComponent,canActivate: [() => inject(ConfigService).configId > 0]},
  { path: '**', redirectTo: 'select-model' }
];
