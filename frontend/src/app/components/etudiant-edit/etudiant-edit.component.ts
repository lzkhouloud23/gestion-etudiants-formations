import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-etudiant-edit',
  templateUrl: './etudiant-edit.component.html',
  styleUrls: ['./etudiant-edit.component.css']
})
export class EtudiantEditComponent implements OnInit {

  formValue!: FormGroup;
  formations: any[] = [];
  submitted = false;
  etudiantId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.etudiantId = this.route.snapshot.paramMap.get('id') || '';

    this.formValue = this.formBuilder.group({
      nom:       ['', Validators.required],
      prenom:    ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      telephone: [''],
      formation: ['']
    });

    // Charger les formations
    this.api.getFormations().subscribe(
      (res) => { this.formations = res; },
      (err) => { console.log(err); }
    );

    // Charger l'étudiant et remplir le formulaire
    this.api.getEtudiantById(this.etudiantId).subscribe(
      (data) => {
        this.formValue.controls['nom'].setValue(data.nom);
        this.formValue.controls['prenom'].setValue(data.prenom);
        this.formValue.controls['email'].setValue(data.email);
        this.formValue.controls['telephone'].setValue(data.telephone || '');
        this.formValue.controls['formation'].setValue(
          data.formation?._id || data.formation || ''
        );
      },
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
    if (!data.formation) data.formation = null;

    this.api.updateEtudiant(this.etudiantId, data).subscribe(
      () => {
        alert('Étudiant modifié avec succès !');
        this.router.navigate(['/etudiants']);
      },
      (err) => {
        alert('Erreur : ' + (err.error?.message || 'Une erreur est survenue'));
      }
    );
  }
}