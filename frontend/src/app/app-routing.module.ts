import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';
import { EtudiantAddComponent } from './components/etudiant-add/etudiant-add.component';
import { EtudiantEditComponent } from './components/etudiant-edit/etudiant-edit.component';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { FormationAddComponent } from './components/formation-add/formation-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/etudiants', pathMatch: 'full' },
  { path: 'etudiants',                component: EtudiantListComponent },
  { path: 'etudiants/ajouter',        component: EtudiantAddComponent },
  { path: 'etudiants/modifier/:id',   component: EtudiantEditComponent },
  { path: 'formations',               component: FormationListComponent },
  { path: 'formations/ajouter',       component: FormationAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }