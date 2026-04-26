import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';
import { EtudiantAddComponent } from './components/etudiant-add/etudiant-add.component';
import { EtudiantEditComponent } from './components/etudiant-edit/etudiant-edit.component';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { FormationAddComponent } from './components/formation-add/formation-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EtudiantListComponent,
    EtudiantAddComponent,
    EtudiantEditComponent,
    FormationListComponent,
    FormationAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }