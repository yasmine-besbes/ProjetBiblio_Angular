import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BooksService } from '../books.service';
declare var Swal:any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,FormsModule,NgFor,NgIf
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  searchText: string = '';
  selectedCategory: string = '';
  showEmpruntForm: boolean = false;
  dateEmprunt: string='';
  selectedBookId: number | null = null;

  books: any[] = [];

  constructor(private http: HttpClient, private serv:BooksService) {}

  searchBooks() {
    this.serv.searchBooks(this.selectedCategory, this.searchText)
    .subscribe(data => {
      this.books = data;
    });
  }


  /*toggleEmpruntForm() {
    this.showEmpruntForm = !this.showEmpruntForm;
  }*/
  

  toggleEmpruntForm(bookId: number) {
      this.selectedBookId = this.selectedBookId === bookId ? null : bookId;
    }

  onEmprunter(idLivre: number) {
    console.log(idLivre);
    const userDataString = localStorage.getItem('LoggedUser');
  if (userDataString) { // Vérifie si userDataString n'est pas null ou undefined
    const userData = JSON.parse(userDataString);
    if (userData && userData.idUser) {
      this.serv.emprunterLivre(userData.idUser, idLivre, this.dateEmprunt).subscribe(
        response => {
          // Gérer la réponse de votre backend
          console.log(response.message);
          Swal.fire(response.message);
        },
        error => {
          // Gérer les erreurs
          console.error('Erreur lors de l\'emprunt du livre :', error);
        }
      );
    } else {
      console.error('Impossible de récupérer l\'id de l\'utilisateur depuis le localStorage.');
    }
  } else {
    console.error('Aucune donnée utilisateur trouvée dans le localStorage.');
  }
      
    }
    
}