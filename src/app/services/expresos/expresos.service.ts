import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// class
import { Expreso } from 'src/app/clases/expreso';
// services
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExpresosService {
  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Expreso[]> {
    return this.miHttp.httpGetO<Expreso[]>('/expresos/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/expresos/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<Expreso> {
    return this.miHttp.httpGetO<Expreso>('/expresos/' + '"' + id + '"');
  }

  public Alta(
    id_direccion: number,
    nombre: string
  ): Promise<object> {
    const request: object = {
      id_direccion,
      nombre
    };
    return this.miHttp.httpPostP('/expresos/', request);
  }

  public Update(
    id_expreso: number,
    id_direccion: number,
    nombre: string
  ): Promise<object> {
    const request: object = {
      id_expreso,
      id_direccion,
      nombre
    };
    return this.miHttp.httpPostP('/expresos/update', request);
  }
}
