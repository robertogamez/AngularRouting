﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent  } from './page-not-found.component';
import { AuthGuard } from './user/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { 
                path: 'products', 
                loadChildren: 'app/products/product.module#ProductModule',
                canLoad: [ AuthGuard ]
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], { enableTracing: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}