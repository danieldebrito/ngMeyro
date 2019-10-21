import { Component, OnInit, DoCheck } from '@angular/core';

// class
import { PedidoItem } from 'src/app/clases/pedidoItem';
import { Pedido } from 'src/app/clases/pedido';
import { Articulo } from 'src/app/clases/articulo';
import { Cliente } from 'src/app/clases/cliente';

// services
import { AuthService } from 'src/app/services/cliente/auth.service';
import { PedidoItemService } from 'src/app/services/pedidos/pedido_item.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ArticulosService } from 'src/app/services/articulo/articulos.service';
import { SucursalesService } from 'src/app/services/cliente/sucursales.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit, DoCheck {

  public identity: Cliente;
  public articulo: Articulo;
  public pedidoItems: PedidoItem[] = [];
  public sucursales = [];
  public expresos = [];

  public id_sucursal: number;
  public id_expreso: number;
  public envio: string;
  public fecha: string;
  public observaciones: string;

  constructor(
    private pedidoItemServ: PedidoItemService,
    public artService: ArticulosService,
    public pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    
    private authService: AuthService
  ) { }

  public nuevoPedido() { }

  /**
   * trae los items que tengan el atributo estado = 'abierto' y sean del cliente en sesion
   */
  public listarPedidoAbierto() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.id).subscribe(response => {
      this.pedidoItems = response;
    },
      error => {
        console.error(error);
      });
  }

  /**
   *
   * @param id de la entidad
   * borra un item de la entidad mediante id
   */
  public borrarItem(id: string) {
    this.pedidoItemServ.Baja(id).then(
      response => {
        this.listarPedidoAbierto();
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  /**
   * LISTA las sucursales del cliente en sesion
   * debe seleccionar una para cerrar el pedido.
   */
  listaPorCliente() {
    this.sucursalesService.ListarPorCliente(this.identity.id).subscribe(response => {
      this.sucursales = response;
    });
  }

  /**
 * LISTA los expresos
 * debe seleccionar uno para cerrar el pedido.
 */
  listaExpresos() {
    this.expresosService.Listar().subscribe(response => {
      this.expresos = response;
    });
  }

  /**
   * EN CONSTRUCCION
   * LA IDEA ES QUE CREE UN NUEVO PEDIDO TOMANDO LAS VARIABLES DE LA SESION DE USUARIO
   *        this.id_sucursal,
            this.id_expreso,
            this.envio,
            this.fecha,
            this.observaciones
   */

  public crearPedido() {
    this.pedidosService.Alta(
      this.id_sucursal,
      this.id_expreso,
      this.envio,
      this.fecha,
      this.observaciones).then(
        response => {
          return response;
        }
      ).catch(
        error => {
          console.error('ERROR DEL SERVIDOR', error);
        }
      );
  }


  /**
   *   EN CONSTRUCCION CIERRA LOS ITEMS PARA ARMAR EL PEDIDO, CAMBIA ESTADO A CERRADO Y CARGA NRO DE PEDIDO
   * @param id_pedido => id de pedido
   * @param id_cliente => id de cliente
   */
  public cerrarPedido(id_pedido, id_cliente) {
    this.pedidoItemServ.cierraItems(id_pedido, id_cliente).then(
      response => {
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.listarPedidoAbierto();
  }

  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.listaPorCliente();
    this.listaExpresos();
  }
}
