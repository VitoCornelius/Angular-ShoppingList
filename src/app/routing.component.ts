import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
 
const applicationRoutes : Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'}    
];

@NgModule({
    imports: [
        RouterModule.forRoot(applicationRoutes)
    ],
    exports : [RouterModule]
})
export class RoutingComponent {}
