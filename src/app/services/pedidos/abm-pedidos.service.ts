import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Pedido } from 'src/app/clases/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbmPedidosService {

  constructor(public miHttp: BaseService) { }

  public altaPedido(
    // id_pedido: number,  // AI
    id_cliente: string,
    id_sucursal: string,
    id_expreso: string,
    // estado: string, // DEFAULT => 'abierto'
    fecha: string,
    observ: string
  ): Promise<Object> {

      const request: Object = {
        id_cliente: id_cliente,
        id_sucursal: id_sucursal,
        id_expreso: id_expreso,
        fecha: fecha,
        observ: observ
    };
    return this.miHttp.httpPostP('/pedido/', request);
  }

  public traerUno(id: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedido/' + '"' + id + '"');
  }

}