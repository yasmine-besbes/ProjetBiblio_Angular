import { Routes } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { SuivieComponent } from './suivie/suivie.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { authGuard } from './auth.guard';
import { NavUserComponent } from './nav-user/nav-user.component';
import { SearchComponent } from './search/search.component';
import { HistoriqueComponent } from './historique/historique.component';

export const routes: Routes = [
    {path:'' , redirectTo:'login', pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'', component:NavComponent,children:[{path:'gestion', component:GestionComponent,canActivate:[authGuard]},
    {path:'suivie',component:SuivieComponent,canActivate:[authGuard]}]},
    {path:'',component:NavUserComponent,children:[{path:'search', component:SearchComponent,canActivate:[authGuard]},
        {path:'historique',component:HistoriqueComponent,canActivate:[authGuard]}
    ]}
];
