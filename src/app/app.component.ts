import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { GestionComponent } from './gestion/gestion.component';
import { SuivieComponent } from './suivie/suivie.component';
import { LoginComponent } from './login/login.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { SearchComponent } from './search/search.component';
import { HistoriqueComponent } from './historique/historique.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,GestionComponent,SuivieComponent,LoginComponent,NavUserComponent,SearchComponent,HistoriqueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app1';
}
