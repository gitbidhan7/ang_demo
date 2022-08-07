import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { RegFormComponent } from './reg-form/reg-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    AppComponent,
    TodolistComponent,
    AddtocartComponent,
    RegFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
