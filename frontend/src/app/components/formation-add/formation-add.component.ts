import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent implements OnInit {

  formValue!: FormGroup;
  submitted = false;
  niveaux = ['Licence', 'Master', 'Ingénieur', 'Doctorat', 'Autre'];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      titre:       ['', Validators.required],
      description: [''],
      niveau:      ['Licence', Validators.required],
      departement: ['']
    });
  }

  get titre() { return this.formValue.get('titre'); }

  onSubmit(): void {
    this.submitted = true;
    if (this.formValue.invalid) return;

    this.api.addFormation(this.formValue.value).subscribe(
      () => {
        alert('Formation ajoutée avec succès !');
        this.router.navigate(['/formations']);
      },
      (err) => {
        alert('Erreur : ' + (err.error?.message || 'Une erreur est survenue'));
      }
    );
  }
}