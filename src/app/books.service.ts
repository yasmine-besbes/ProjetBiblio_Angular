import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
declare var Swal: any;
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  /*searchBooks(category: string, title: string): Observable<any[]> {
    if (title.trim() === '') {
      // Si l'entrée de recherche est vide, effectue une recherche par catégorie
      return this.http.get<any[]>('http://localhost/bibApi/get_books.php', {
        params: {
          category: category,
        }
      });
    } else {
      // Sinon, effectue une recherche par titre
      return this.http.get<any[]>('http://localhost/bibApi/get_books.php', {
        params: {
          title: title,
        }
      });
    }
  }*/

  searchBooks(category: string, title: string): Observable<any[]> {
    if (title.trim() === '' && category.trim() === '') {
      
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez spécifier au moins un critère de recherche!",
          
        });
        // Retourne un Observable vide
        return EMPTY;
    } else if (title.trim() === '') {
        // Si l'entrée de recherche est vide, effectue une recherche par catégorie
        return this.http.get<any[]>('http://localhost/bibApi/get_books.php', {
            params: {
                category: category,
            }
        });
    } else {
        // Sinon, effectue une recherche par titre
        return this.http.get<any[]>('http://localhost/bibApi/get_books.php', {
            params: {
                title: title,
            }
        });
    }
}


  emprunterLivre(idUser: number, idLivre: number, dateEmprunt: string): Observable<any> {
    const url = 'http://localhost/bibApi/emprunter.php';
    const formattedDate = new Date(dateEmprunt).toISOString();
    const body = {
      idUser: idUser,
      idLivre: idLivre,
      delais: formattedDate
    };
    console.log(idLivre);
    /*const body = new FormData();
    body.append('idUser', idUser.toString());
    body.append('idLivre', idLivre.toString());
    body.append('delais', dateEmprunt);*/
    return this.http.post<any>(url, body);
  }
  getLivresEmpruntesUtilisateur(idUser: number): Observable<any[]> {
    const url = `http://localhost/bibApi/getLivreEmprunte.php?idUser=${idUser}`;
    return this.http.get<any[]>(url);
  }

  

}