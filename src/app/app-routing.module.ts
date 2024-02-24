import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerViewComponent} from './player-view/player-view.component';
import {HomeSearchComponent} from "./home-search/home-search.component";

const routes: Routes = [
  {path: '', component: HomeSearchComponent},
  {path: 'player/:name/:realm', component: PlayerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
