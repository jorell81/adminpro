import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


// Cuando tengamos el login y el registro por aparte del template principal se deben agregar hijo "Childrens" para poder manejarlos por separado

const routes: Routes = [
  // { 
  //   path: '',
  //   component: PagesComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'progress', component: ProgressComponent },
  //     { path: 'graficas1', component: Graficas1Component },
  //     { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  //   ]
  // },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];


export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true});
