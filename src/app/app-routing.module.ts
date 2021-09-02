import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiphyComponent } from './giphy/giphy.component';

const routes: Routes = [
  { path: '',  component: GiphyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
