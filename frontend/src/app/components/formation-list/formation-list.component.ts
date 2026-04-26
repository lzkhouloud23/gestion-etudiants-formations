import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

  formations: any[] = [];
  selectedFormation: any = null;
  editForm!: FormGroup;
  submitted = false;
  niveaux = ['Licence', 'Master', 'Ingénieur', 'Doctorat', 'Autre'];

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      titre:       ['', Validators.required],
      description: [''],
      niveau:      ['Licence'],
      departement: ['']
    });
    this.getAllFormations();
  }

  getAllFormations(): void {
    this.api.getFormations().subscribe(
      (res) => { this.formations = res; },
      (err) => { console.log(err); }
    );
  }

  onEdit(f: any): void {
    this.selectedFormation = f;
    this.submitted = false;
    this.editForm.controls['titre'].setValue(f.titre);
    this.editForm.controls['description'].setValue(f.description || '');
    this.editForm.controls['niveau'].setValue(f.niveau);
    this.editForm.controls['departement'].setValue(f.departement || '');
  }

  updateFormation(): void {
    this.submitted = true;
    if (this.editForm.invalid) return;
    this.api.updateFormation(this.selectedFormation._id, this.editForm.value).subscribe(
      () => {
        alert('Formation mise à jour !');
        this.getAllFormations();
      },
      (err) => { alert('Erreur modification'); }
    );
  }

  deleteFormation(f: any): void {
    if (confirm(`Supprimer "${f.titre}" ?`)) {
      this.api.deleteFormation(f._id).subscribe(
        () => {
          alert('Formation supprimée !');
          this.getAllFormations();
        },
        (err) => { alert('Erreur suppression'); }
      );
    }
  }
}