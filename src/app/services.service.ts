import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  
  readonly url="http://localhost/bibApi/livre.php";
  readonly url2="http://localhost/bibApi/utilisateur.php";
  readonly url3="http://localhost/bibApi/emprunter.php";


  constructor(private http:HttpClient) { }
  addLivre(livre:any,type:any):Observable<any>{
    if(type=="Ajouter")
    {
      return this.http.post(this.url,livre);
    }else{
      return this.http.put(this.url+"?idLivre="+livre.idLivre,livre);
    }
    
  }
  GetAllLivre():Observable<any>{
    return this.http.get(this.url);
  }
  DeleteLivreById(id:any):Observable<any>{
   return this.http.delete(this.url+"?idLivre="+id);
  }
  GetLivreById(id:any):Observable<any>{
    return this.http.get(this.url+"?idLivre="+id);
   }
   GetAllUsers():Observable<any>{
    return this.http.get(this.url2);
   }
   GetLivreEmpruntes():Observable<any>{
    return this.http.get(this.url3);
   }
   UpdateLivre(livre: any): Observable<any> {
    return this.http.put(`${this.url}?idLivre=${livre.idLivre}`, livre);
  }
   //modifier(livre:any,id:any):Observable<any>{
   // return this.http.put(this.url+"?idLivre="+id,livre)
    
   //}

   login(loginData:any):Observable<any>{
    return this.http.post(this.url2,loginData);
  }
  signUp(signUpData:any):Observable<any>{
    return this.http.post(this.url2,signUpData);

  }
}
