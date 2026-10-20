import { CrearUsuariosComponent } from '@mod/users/admin/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "@mod/users/admin/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "@mod/users/admin/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from '@mod/users/admin/components/filtro/filtro.component';
import { ReporteUsuarioComponent } from '@mod/users/admin/components/reporte/reporte.component';
import { VerPermisosComponent } from '@mod/users/admin/pages/principal/components/ver-permisos/ver-permisos.component';

import { CrearModuloPermisoComponent } from '@mod/modules/admin/components/crear-modulo-permiso/crear-modulo-permiso.component';
import { EditarModuloPermisoComponent } from '@mod/modules/admin/components/editar-modulo-permiso/editar-modulo-permiso.component';

import { VerVarComponent } from '@mod/vars/admin/components/ver-var/ver-var.component';
import { CrearVarComponent } from '@mod/vars/admin/components/crear-var/crear-var.component';
import { EditarVarComponent } from '@mod/vars/admin/components/editar-var/editar-var.component';
import { FiltroVarComponent } from '@mod/vars/admin/components/filtro-var/filtro-var.component';
import { ReporteComponent } from '@mod/vars/admin/components/reporte/reporte.component';

export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
    // usuarios
    {
      name: 'CrearUsuariosComponent',
      componente: CrearUsuariosComponent
    },
    {
      name: 'VerUsuariosComponent',
      componente: VerUsuariosComponent
    },
    {
      name: 'EditarUsuariosComponent',
      componente: EditarUsuariosComponent
    },
    {
      name: 'FiltroUsuariosComponent',
      componente: FiltroUsuariosComponent      
    },
    {
      name: 'ReporteUsuarioComponent',
      componente: ReporteUsuarioComponent      
    },
    {
      name: 'VerPermisosComponent',
      componente: VerPermisosComponent     
    },
    
    // modulos permisos
    {
      name: 'CrearModuloPermisoComponent',
      componente: CrearModuloPermisoComponent  
    },
    {
      name: 'EditarModuloPermisoComponent',
      componente: EditarModuloPermisoComponent  
    },
    
    // modulo var
    {
      name: 'CrearVarComponent',
      componente: CrearVarComponent
    },  
    {
      name: 'EditarVarComponent',
      componente: EditarVarComponent
    },  
    {
      name: 'FiltroVarComponent',
      componente: FiltroVarComponent
    },  
    {
      name: 'VerVarComponent',
      componente: VerVarComponent
    },  
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
