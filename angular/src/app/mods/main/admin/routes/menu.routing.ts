  import { Routes } from '@angular/router';
  import { adminGuard } from '@guard/roles/admin/admin.guard';
  import { 
    BREADCRUMB_PATH_MODULES, 
    BREADCRUMB_PATH_USERS, 
    PATH_MODULES, 
    PATH_USERS, 
    TITLE_PATH_MODULES, 
    TITLE_PATH_USERS, 
    PATH_VAR,
    TITLE_PATH_VAR,
    BREADCRUMB_PATH_VAR,
    PATH_CUSTOM,
    TITLE_PATH_CUSTOM,
    BREADCRUMB_PATH_CUSTOM,
  } from '@mod/main/const/main.const';

  export const MenuRoutes: Routes = [

    // Modulo Usuarios
    {
      path: PATH_USERS,
      title: TITLE_PATH_USERS,
      data: { breadcrumb: BREADCRUMB_PATH_USERS },
      loadChildren: () => import('@mod/users/admin/routes/index.routing').then(x=>x.UsuariosRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Modulos
    {
      path: PATH_MODULES,
      title: TITLE_PATH_MODULES,
      data: { breadcrumb: BREADCRUMB_PATH_MODULES },
      loadChildren: () => import('@mod/modules/admin/routes/modulos.routing').then(x=>x.ModulosRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Vars
    {
      path: PATH_VAR,
      title: TITLE_PATH_VAR,
      data: { breadcrumb: BREADCRUMB_PATH_VAR },
      loadChildren: () => import('@mod/vars/admin/routes/index.routing').then(x=>x.VarsRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Custom
    {
      path: PATH_CUSTOM,
      title: TITLE_PATH_CUSTOM,
      data: { breadcrumb: BREADCRUMB_PATH_CUSTOM },
      loadChildren: () => import('@mod/custom/admin/routes/index.routing').then(x=>x.CustomRoutes),
      canActivate: [
        adminGuard
      ]
    },

  ];