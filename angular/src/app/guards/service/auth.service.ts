import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { _PAGE_BACK_HOME, STORAGE_KEY_TOKEN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { LAYOUT_PAGE_LOGOUT } from '@layout/const/layouts.const';
import { TranslateService } from '@ngx-translate/core';
import { TokenStore, AuthRole } from '@core/token.store';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tokenStore: TokenStore
  ) {}

  getToken(){
    return this.tokenStore.get() || '';
  }

  async validarToken(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `${rol}/profile?lang=${lang}`
    let urlCopleta = environment.apiUrl + complemento

    let headers = {
      WORD_KEY_AUTHORIZATION_GLOBAL: `${WORD_KEY_BEARER_GLOBAL} ${this.getToken()}`
    }

    try {
      await axios.get(urlCopleta, {headers})
      return true
    } catch(error) {
      return false
    }
  }

  async getUser(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `${rol}/profile?lang=${lang}`
    let urlCopleta = environment.apiUrl + complemento

    const data = await axios.get(urlCopleta, {
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${this.getToken()}`
      }
    });

    return data
  }

  async refreshToken(rol:string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    
    const token = this.tokenStore.get() || '';

    const removeToken = () => {
      this.tokenStore.clear();
      this.router.navigate([_PAGE_BACK_HOME]);
    };

    if (!token) {
      const mensaje = this.translate.instant('mod-users.CONSOLE_ERROR_INVALID_TOKEN');
      console.log(mensaje)
      removeToken();
      return false; 
    }

    let complemento = `${rol}/refresh?lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    try {
      let data = (await axios.post(urlCopleta, {}, { withCredentials: true })).data
      const newAccess = (typeof data === 'string') ? data : (data.access_token || data.token || token);
      const role = this.tokenStore.getRole();
      if (role && newAccess) {
        this.tokenStore.set(newAccess, role);
      }
      return newAccess
    } catch(error) {
      removeToken()
      return false
    }
  }

  async isAuth(rol: string){
    if(!this.tokenStore.has()){
      const role: AuthRole = rol === STORAGE_KEY_ADMIN_AUTH ? 'admin' : 'final';
      const ok = await this.tryRefresh(role);
      if(!ok) return false;
    }
    return await this.validarToken(rol);
  }

  async tryRefresh(role: AuthRole): Promise<boolean> {
    const endpoint = role === 'admin' ? 'authadmin/refresh' : 'authuser/refresh';
    try {
      const res = await axios.post(environment.apiUrl + endpoint, {}, { withCredentials: true });
      const data = res.data;
      const newAccess = typeof data === 'string' ? data : (data?.access_token || data?.token);
      if (!newAccess) return false;
      this.tokenStore.set(newAccess, role);
      return true;
    } catch {
      this.tokenStore.clear();
      return false;
    }
  }

}

