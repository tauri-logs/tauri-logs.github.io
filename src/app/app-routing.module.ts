import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerViewComponent} from "./player-view/player-view.component";

const routes: Routes = [
  {path: 'player/:name', component: PlayerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
