import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suivie',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,RouterOutlet],
  templateUrl: './suivie.component.html',
  styleUrl: './suivie.component.css'
})
export class SuivieComponent {
  utilisateurs:any;
  livre:any;
  livres:any;
  constructor(private serv:ServicesService){}
  ngOnInit(): void {
    this.GetAllUsers();
    this.GetLivreEmpruntes();
    
  
      
  }
  GetAllUsers(){
    
    this.serv.GetAllUsers().subscribe(data=>{console.log("Users",data);
    this.utilisateurs=data;
  });
  }
  GetLivreEmpruntes(){
    this.serv.GetLivreEmpruntes().subscribe(data=>{console.log("livres",data);
  this.livres=data;
   });
  }
  GetLivreById(id: any) {
    console.log("ID du livre à récupérer :", id);
    this.serv.GetLivreById(id).subscribe({
      next: (data) => {
        console.log("livre:", data);
        const livre = data; // Récupérer le livre
        // Inverser le statut
        livre.Status = livre.Status === 'disponible' ? 'emprunté' : 'disponible';
        // Mettre à jour le livre dans la base de données
        this.serv.UpdateLivre(livre).subscribe({
          next: () => {
            console.log("Statut du livre mis à jour avec succès.");
            // Mettre à jour la liste des livres
            this.GetLivreEmpruntes();
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour du statut du livre:", error);
          }
        });
      },
      error: (error) => {
        console.error("Erreur lors de la récupération du livre:", error);
      }
    });
  }

}
