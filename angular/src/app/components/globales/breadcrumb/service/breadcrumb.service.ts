import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

// Importa tus constantes según sea necesario
import { BREADCRUMB_PATH_MENU } from '@const/app.const';
import { BREADCRUMB_PATH_MODULES, BREADCRUMB_PATH_USERS } from '@mod/main/const/main.const';
import { BREADCRUMB_PATH_SUBMODULES } from '@mod/modules/const/modules.const';
import { BREADCRUMB_PATH_ADMIN_USERS, BREADCRUMB_PATH_ASSIGN_ADMIN_USERS, BREADCRUMB_PATH_FINAL_USERS } from '@mod/users/const/users.const';

export interface Breadcrumb {
  label: string;
  url: string;
  queryParams?: any;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.buildBreadcrumbs(this.router.routerState.root);
      this.breadcrumbsSubject.next(breadcrumbs);
    });
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        // Gestión de queryParams heredada del segundo código
        let params = { ...child.snapshot.queryParams };
        
        if (
          label === BREADCRUMB_PATH_MENU || 
          label === BREADCRUMB_PATH_USERS || 
          label === BREADCRUMB_PATH_ADMIN_USERS || 
          label === BREADCRUMB_PATH_FINAL_USERS ||
          label === BREADCRUMB_PATH_MODULES 
        ) {
          params = {};
        }

        if (label === BREADCRUMB_PATH_SUBMODULES) {
          delete params['id_submodule'];
        }

        breadcrumbs.push({ 
          label, 
          url, 
          queryParams: params 
        });
      }
      
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    
    return breadcrumbs;
  }
}