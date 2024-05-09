import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
declare var Swal: any;
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,RouterModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  loggedUser:any;

  constructor( private route:Router){
    const localUser=localStorage.getItem('LoggedUser');
    if(localUser!=null){
      this.loggedUser=JSON.parse(localUser);
    }
  }
  
  logOut(){
    Swal.fire({
      title: "Are you sure to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A9D79B",
      cancelButtonColor: "#F38574",
      confirmButtonText: "Yes"
      
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logged out!",
          icon: "success"
        });
        localStorage.removeItem('LoggedUser');
        this.route.navigateByUrl('/login');
      }
    });
  }

}