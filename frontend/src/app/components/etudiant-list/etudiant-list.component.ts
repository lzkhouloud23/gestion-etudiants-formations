import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  etudiants: any[] = [];
  formations: any[] = [];
  searchNom: string = '';
  selectedFormation: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEtudiants();
    this.getAllFormations();
  }

  getAllEtudiants(): void {
    this.api.getEtudiants().subscribe(
      (res) => { this.etudiants = res; },
      (err) => { console.log(err); }
    );
  }

  getAllFormations(): void {
    this.api.getFormations().subscribe(
      (res) => { this.formations = res; },
      (err) => { console.log(err); }
    );
  }

  // Filtre local par nom
  get etudiantsFiltres(): any[] {
    return this.etudiants.filter(e => {
      const matchNom = this.searchNom === '' ||
        e.nom?.toLowerCase().includes(this.searchNom.toLowerCase()) ||
        e.prenom?.toLowerCase().includes(this.searchNom.toLowerCase());
      const matchFormation = this.selectedFormation === '' ||
        e.formation?._id === this.selectedFormation;
      return matchNom && matchFormation;
    });
  }
  get etudiantsAvecFormation(): number {
  return this.etudiants.filter(e => e.formation).length;
}

get etudiantsSansFormation(): number {
  return this.etudiants.filter(e => !e.formation).length;
}

  resetFiltres(): void {
    this.searchNom = '';
    this.selectedFormation = '';
  }

  deleteEtudiant(etudiant: any): void {
    if (confirm(`Supprimer ${etudiant.prenom} ${etudiant.nom} ?`)) {
      this.api.deleteEtudiant(etudiant._id).subscribe(
        () => {
          alert('Étudiant supprimé !');
          this.getAllEtudiants();
        },
        (err) => { alert('Erreur suppression'); }
      );
    }
  }
}