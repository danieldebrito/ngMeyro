import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticulosService } from '../../../../services/articulo/articulos.service';
import { Articulo } from 'src/app/clases/articulo';

@Component({
  selector: 'app-tabla-comp-jgos',
  templateUrl: './tabla-comp-jgos.component.html',
  styleUrls: ['./tabla-comp-jgos.component.css']
})
export class TablaCompJgosComponent implements OnInit {

  @Input() allItems: Articulo[];
  @Output() showValue = new EventEmitter();

  constructor( private articulosService: ArticulosService ) {

  }

  cambia() {
    this.showValue.emit();
  }


  ngOnInit() {
  }

}
