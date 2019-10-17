import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// class
import { Sucursal } from 'src/app/clases/sucursal';
import { Cliente } from 'src/app/clases/cliente';

// services
import { SucursalesService } from 'src/app/services/cliente/sucursales.service';
import { AuthService } from 'src/app/services/cliente/auth.service';


@Component({
  selector: 'app-sucursales-listado',
  templateUrl: './sucursales-listado.component.html',
  styleUrls: ['./sucursales-listado.component.css']
})
export class SucursalesListadoComponent implements OnInit {

  public redirectURL: string;
  public sucursales = [];
  public identity: Cliente;

  constructor(
    private router: Router,
    private sucursalesService: SucursalesService,
    private authService: AuthService
  ) {
    this.identity = this.authService.getIdentityLocalStorage();
   }

  mostrarDetalle(sucursal: Sucursal) {
    this.redirectURL = '/sucursal';
    this.router.navigate([this.redirectURL]);
    localStorage.setItem('sucursalDetalle', JSON.stringify(sucursal));
  }

  cargarListaPorCliente() {
    this.sucursalesService.ListarPorCliente(this.identity.id).subscribe(response => {
      this.sucursales = response;
    });
  }

  eliminar(id: string) {
    this.sucursalesService.Baja(id).then( () => {
      this.cargarListaPorCliente();
    });
  }

  ngOnInit() {
    this.cargarListaPorCliente();
    this.identity = this.authService.getIdentityLocalStorage();
  }

}
