import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-etudiant-add',
  templateUrl: './etudiant-add.component.html',
  styleUrls: ['./etudiant-add.component.css']
})
export class EtudiantAddComponent implements OnInit {

  formValue!: FormGroup;
  formations: any[] = [];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nom:       ['', Validators.required],
      prenom:    ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      telephone: [''],
      formation: ['']
    });

    this.api.getFormations().subscribe(
      (res) => { this.formations = res; },
      (err) => { console.log(err); }
    );
  }

  get nom()    { return this.formValue.get('nom'); }
  get prenom() { return this.formValue.get('prenom'); }
  get email()  { return this.formValue.get('email'); }

  onSubmit(): void {
    this.submitted = true;
    if (this.formValue.invalid) return;

    const data = { ...this.formValue.value };
    if (!data.formation) delete data.formation;

    this.api.addEtudiant(data).subscribe(
      () => {
        alert('Étudiant ajouté avec succès !');
        this.router.navigate(['/etudiants']);
      },
      (err) => {
        alert('Erreur : ' + (err.error?.message || 'Une erreur est survenue'));
      }
    );
  }
}