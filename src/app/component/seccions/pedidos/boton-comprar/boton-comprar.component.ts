import { Component, OnInit, DoCheck, Input } from '@angular/core';

// class
import { Cliente } from 'src/app/clases/cliente';

// servicios
import { PedidoItemService } from 'src/app/services/pedidos/pedido_item.service';
import { AuthService } from 'src/app/services/cliente/auth.service';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.component.html',
  styleUrls: ['./boton-comprar.component.css']
})

export class BotonComprarComponent implements OnInit, DoCheck {

  public identity: Cliente;
  @Input() id_articulo: string;
  public cantidad: number;

  constructor(
    private pedidoItemServ: PedidoItemService,
    private authService: AuthService) {
    this.cantidad = 1;
  }

  public cargaItem() {
    this.pedidoItemServ.Alta(
      this.identity.id,
      '-1',
      this.id_articulo,
      this.cantidad,
      'abierto'
    ).then(
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
  }

  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
  }
}
