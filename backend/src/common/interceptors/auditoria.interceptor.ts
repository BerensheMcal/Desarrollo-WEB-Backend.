import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditoriaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const usuario = request.user;
    const ahora = new Date().toISOString();

    console.log(
      `[AUDITORIA] Usuario: ${usuario?.email || 'ANONIMO'} | IP: ${request.ip} | Ruta: ${request.method} ${request.url} | Fecha: ${ahora}`,
    );

    return next.handle().pipe(
      tap(() => {
        console.log(
          `[AUDITORIA] Finalizado: ${usuario?.email || 'ANONIMO'} | ${request.method} ${request.url}`,
        );
      }),
    );
  }
}
