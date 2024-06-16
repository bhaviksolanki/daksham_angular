import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PreloaderComponent } from './preloader/preloader.component';


export const routes: Routes = [
    {
        path: '',
        component: PreloaderComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'project/:id',
        component: ProjectPageComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },

];
