import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { SpecificLogComponent } from './specific-log/specific-log.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { LogViewSettingsComponent } from './log-view-settings/log-view-settings.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CookieService} from "ngx-cookie-service";
import {MY_DATE_FORMATS} from "./tauri/dateFormat";

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    PlayerViewComponent,
    SpecificLogComponent,
    LogViewSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatCheckboxModule
  ],
  providers: [
    CookieService,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: navigator.language}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
