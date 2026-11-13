import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { IdiomaComponent } from '@component/globales/idioma/idioma.component';

import { STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { TokenStore } from '@core/token.store';
import axios from 'axios';
import { environment } from '@environment/environment';
import { LAYOUT_PAGE_LOGOUT, LAYOUT_PAGE_PROFILE, LAYOUT_PAGE_SETTINGS, NAME_PAGE } from '@layout/const/layouts.const';
import { CommonModule } from '@angular/common';
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';

@Component({
  selector: 'app-layout-final',
  standalone: true,
  imports: [
    IdiomaComponent,
    ColormodeComponent,
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './final.component.html',
  styleUrl: './final.component.scss'
})
export class FinalComponent {

  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_PAGE_PROFILE = LAYOUT_PAGE_PROFILE;
  public LAYOUT_PAGE_SETTINGS = LAYOUT_PAGE_SETTINGS;
  
  public CURRENT_YEAR = new Date().getFullYear();

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tokenStore: TokenStore
  ) {}

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  async cerrarSession(){
    try {
      await axios.post(`${environment.apiUrl}authuser/logout`, {}, { withCredentials: true, headers: { Authorization: `Bearer ${this.tokenStore.get() || ''}` } });
    } catch (e) {}
    this.tokenStore.clear();
    this.router.navigate([LAYOUT_PAGE_LOGOUT]);
  }

}