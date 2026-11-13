import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { refreshAccessToken } from './axios.interceptor';
import { getAccessToken, getAuthRole } from './token.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getAccessToken();
  const role = getAuthRole();
  const isAdmin = role ? role === 'admin' : true;

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}` },
    });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !(req as any)._retry) {
        (req as any)._retry = true;
        return new Observable<HttpEvent<any>>((observer) => {
          refreshAccessToken(isAdmin)
            .then((newToken) => {
              const retryReq = req.clone({
                setHeaders: { [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${newToken}` },
              });
              next(retryReq).subscribe(observer);
            })
            .catch((e) => observer.error(e));
        });
      }
      return throwError(() => err);
    })
  );
};
