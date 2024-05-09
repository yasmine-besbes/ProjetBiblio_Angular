import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
declare var $:any
declare var Swal:any;
@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit{
  livres:any;
  LivreForm:any;
  constructor(private fb:FormBuilder,private serv:ServicesService ){
    this.LivreForm=this.fb.group({
      idLivre:[""],
      Titre:new FormControl('',[Validators.required]),
      Auteur:new FormControl('',[Validators.required]),
      Categorie:new FormControl('',[Validators.required]),
      Quantite:new FormControl('',[Validators.required]),
      Image:new FormControl('',[Validators.required]),
      Status:new FormControl('',[Validators.required])
    })
  }
  
  ngOnInit(): void {
    this.GetAllLivre();
  
      
  }
  ajouter(){
    if(this.LivreForm.valid){
    var type=this.LivreForm.value.idLivre==""?"Ajouter":"Editer";
    console.log(this.LivreForm.value);
    this.serv.addLivre(this.LivreForm.value,type).subscribe(data=>{
      if(type=='Ajouter'){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your book has been added!",
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result: { isConfirmed: any; isDenied: any; }) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            window.location.reload();
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
      
    this.LivreForm.reset();
    this.GetAllLivre();
  });
  }else{
    this.LivreForm.markAllAsTouched();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tous les champs doivent etre remplis!",
    });
  }
 }

  GetAllLivre(){
    
    this.serv.GetAllLivre().subscribe(data=>{console.log("livre",data);
    this.livres=data;
  });
  }
  DeleteLivreById(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.serv.DeleteLivreById(id).subscribe(data=>{Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.GetAllLivre();
        
      });
        
      }
    });
    
    
  }
  GetLivreById(id:any){
    
    this.serv.GetLivreById(id).subscribe(data=>{
    console.log("livre:",data);
    $("#home-tab-pane").addClass('show');
    $("#home-tab-pane").addClass('active');
    $("#profile-tab-pane").removeClass('show');
    $("#profile-tab-pane").removeClass('active');
    this.LivreForm.patchValue({
      Titre:data.Titre,
      Auteur:data.Auteur,
      Categorie:data.Categorie,
      Quantite:data.Quantite,
      Image:data.Image,
      Status:data.Status,
      idLivre:id
    })
    
  });
  }
  

}
