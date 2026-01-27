import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const stored = localStorage.getItem('token');
  let bearer: string | null = null;
  try {
    const maybeJson = stored ? JSON.parse(stored) : null;
    bearer = maybeJson && typeof maybeJson === 'object' && 'value' in maybeJson ? maybeJson.value : null;
  } catch {
    bearer = stored;
  }

  let newReq = req;
  if (bearer) {
    newReq = req.clone({ setHeaders: { Authorization: `Bearer ${bearer}` } });
  }
  return next(newReq);
};
