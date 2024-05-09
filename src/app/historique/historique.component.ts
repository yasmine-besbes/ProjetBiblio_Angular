import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [NgFor],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {
  livresEmpruntes: any[] = [];

  constructor(private serv: BooksService) { }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('LoggedUser');
    if (userDataString) { // Vérifie si userDataString n'est pas null ou undefined
      const userData = JSON.parse(userDataString);
      if (userData && userData.idUser) {
        this.serv.getLivresEmpruntesUtilisateur(userData.idUser).subscribe({
          next: (livres: any[]) => {
            this.livresEmpruntes = livres;
          },
          error: (error) => {
            console.log('Erreur lors de la récupération des livres empruntés :', error);
          }
        });
      } else {
        console.log('ID utilisateur non trouvé dans le localStorage.');
      }
  }
}

}