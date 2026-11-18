import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Paquete para peticiones http
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/http.interceptor';

// Paquete para traducción
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions
} from '@larscom/ngx-translate-module-loader';

// Paquete para formularios
import { FormsModule } from '@angular/forms';

// Configuración de rutas
import { AppRoutingModule } from './app-routing.module';

// Plantillas
import { AppComponent } from './app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export function createTranslateLoader(http: HttpClient) {
  const baseTranslateUrl = '/assets/app';
  const options: IModuleTranslationOptions = {
    modules: [
      // inicio globales
      { baseTranslateUrl, moduleName: 'components/globales/breadcrumb/i18n', namespace: 'global-breadcrumb' },
      { baseTranslateUrl, moduleName: 'components/globales/idioma/i18n', namespace: 'global-idioma' },
      { baseTranslateUrl, moduleName: 'components/globales/notification/i18n', namespace: 'global-notify' },
      { baseTranslateUrl, moduleName: 'components/globales/loading/i18n', namespace: 'global-loading' },
      { baseTranslateUrl, moduleName: 'components/globales/login/i18n', namespace: 'global-login' },
      { baseTranslateUrl, moduleName: 'components/globales/card/i18n', namespace: 'global-card' },
      { baseTranslateUrl, moduleName: 'components/globales/search/i18n', namespace: 'global-search' },
      { baseTranslateUrl, moduleName: 'components/globales/report/i18n', namespace: 'global-report' },
      { baseTranslateUrl, moduleName: 'components/globales/modal/i18n', namespace: 'global-modal' },
      { baseTranslateUrl, moduleName: 'components/globales/notfound/i18n', namespace: 'global-notfound' },
      { baseTranslateUrl, moduleName: 'components/globales/tablecrud/i18n', namespace: 'global-tablecrud' },
      { baseTranslateUrl, moduleName: 'components/globales/dropzone/i18n', namespace: 'global-dropzone' },
      { baseTranslateUrl, moduleName: 'components/globales/permission/i18n', namespace: 'global-permission' },
      { baseTranslateUrl, moduleName: 'components/globales/breadcrumb/i18n', namespace: 'global-breadcrumb' },
      { baseTranslateUrl, moduleName: 'components/globales/gridcrud/i18n', namespace: 'global-gridcrud' },
      { baseTranslateUrl, moduleName: 'components/globales/scanner/i18n', namespace: 'global-scanner' },
      // fin globales

      // inicio layout
      { baseTranslateUrl, moduleName: 'layouts/home/i18n', namespace: 'layout-home' },
      { baseTranslateUrl, moduleName: 'layouts/admin/i18n', namespace: 'layout-admin' },
      { baseTranslateUrl, moduleName: 'layouts/final/i18n', namespace: 'layout-final' },
      // fin layout

      // inicio modulos
      { baseTranslateUrl, moduleName: 'mods/dashboard/i18n', namespace: 'mod-dashboard'},
      { baseTranslateUrl, moduleName: 'mods/home/i18n', namespace: 'mod-home'},
      { baseTranslateUrl, moduleName: 'mods/main/i18n', namespace: 'mod-main'},
      { baseTranslateUrl, moduleName: 'mods/me/i18n', namespace: 'mod-me'},
      { baseTranslateUrl, moduleName: 'mods/users/i18n', namespace: 'mod-users'},
      { baseTranslateUrl, moduleName: 'mods/modules/i18n', namespace: 'mod-modules'},
      { baseTranslateUrl, moduleName: 'mods/vars/i18n', namespace: 'mod-vars'},
      { baseTranslateUrl, moduleName: 'mods/custom/i18n', namespace: 'mod-custom'},
      // fin modulos
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideCharts(withDefaultRegisterables()),
    provideClientHydration() // Si lo estás usando
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
