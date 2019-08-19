import { Component, OnInit } from '@angular/core';
import { AllArticulosService } from '../../../../services/articulo/consultas-articulos.service';
import { Articulo } from '../../../../clases/articulo';

@Component({
    selector: 'app-filtro',
    templateUrl: './filtro.component.html',
    styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

    // anternar entre grilla y detalle, true muestra grilla.
    public show: boolean;
    public showValue: boolean;

    // valores de los selects.
    public linea: string;
    public marca: string;
    public combustible: string;
    public motor: string;
    public modelo: string;
    public cilindrada: string;
    public competicion: string;
    public producto: string;
    public aplicacion: string;

    public allItems: Articulo[];  // todos.
    public filtroItems;

    // columnas sin repeticion.
    public columnaLinea: string[];
    public columnaMarca: string[];
    public columnaComb: string[];
    public columnaMotor: string[];
    public columnaModelo: string[];
    public columnaCilind: string[];
    public columnaStd: string[];
    public columnaProd: string[];
    public columnaApp: string[];

    // servicio.
    artService: AllArticulosService;

    // para colapsar menues de filtros.
    public isCollapsed = false;
    public isCollapsed2 = true;
    public isCollapsed3 = true;


    constructor(servicio: AllArticulosService) {
        this.artService = servicio;
        this.show = true;
    }

    public cambiaVista () {
        this.show = this.artService.show;
    }

    colapsar1() {
        this.isCollapsed = false;
        this.isCollapsed2 = true;
        this.isCollapsed3 = true;
    }

    colapsar2() {
        this.isCollapsed = true;
        this.isCollapsed2 = false;
        this.isCollapsed3 = true;
    }

    colapsar3() {
        this.isCollapsed = true;
        this.isCollapsed2 = true;
        this.isCollapsed3 = false;
    }

    public Listar() {
        this.artService.ListarO().subscribe(response => {
            this.allItems = response;
        },
            error => {
                console.error(error);
            });
    }

    public Limpiar() {
        this.artService.ListarO().subscribe(response => {
            this.filtroItems = response;

            this.linea = '';
            this.marca = '';
            this.combustible = '';
            this.motor = '';
            this.modelo = '';
            this.cilindrada = '';
            this.competicion = '';
            this.producto = '';
            this.aplicacion = '';

            this.LimpiaColumnas();
        },
            error => {
                console.error(error);
            });
    }

    public LimpiaColumnas () {
        this.columnaLinea = [];
        this.columnaMarca = [];
        this.columnaComb = [];
        this.columnaMotor = [];
        this.columnaModelo = [];
        this.columnaCilind = [];
        this.columnaStd = [];
        this.columnaProd = [];
        this.columnaApp = [];

        this.Colunmas(this.filtroItems);
    }

    public Filtrar() {
        this.artService.FiltrarP(
            this.linea,
            this.marca,
            this.combustible,
            this.motor,
            this.modelo,
            this.cilindrada,
            this.competicion,
            this.producto,
            this.aplicacion).then(
                response => {
                    this.filtroItems = response;
                    this.allItems = this.filtroItems;
                    this.Colunmas(this.allItems);
                }
            )
            .catch(
                error => {
                    console.error('ERROR DEL SERVIDOR', error);
                }
            );
    }

    public Colunmas(items: Articulo[]) {

        let arrayAuxLinea: string[] = [];
        let arrayAuxMarca: string[] = [];
        let arrayAuxComb: string[] = [];
        let arrayAuxMotor: string[] = [];
        let arrayAuxModelo: string[] = [];
        let arrayAuxCilind: string[] = [];
        let arrayAuxStd: string[] = [];
        let arrayAuxProd: string[] = [];
        let arrayAuxApp: string[] = [];

        const arrayRetLinea: string[] = [];
        const arrayRetMarca: string[] = [];
        const arrayRetComb: string[] = [];
        const arrayRetMotor: string[] = [];
        const arrayRetModelo: string[] = [];
        const arrayRetCilind: string[] = [];
        const arrayRetStd: string[] = [];
        const arrayRetProd: string[] = [];
        const arrayRetApp: string[] = [];

        if (items) {
            const tam = items.length;

            for (let i = 0; i < tam; i++) {
                arrayAuxLinea.push(items[i].linea);
                arrayAuxMarca.push(items[i].marca);
                arrayAuxComb.push(items[i].combustible);
                arrayAuxMotor.push(items[i].id_motor);
                arrayAuxModelo.push(items[i].modelo);
                arrayAuxCilind.push(items[i].cilindrada);
                arrayAuxStd.push(items[i].combustible);
                arrayAuxProd.push(items[i].producto);
                arrayAuxApp.push(items[i].aplicacion);
            }

            arrayAuxLinea = arrayAuxLinea.sort();
            arrayAuxMarca = arrayAuxMarca.sort();
            arrayAuxComb = arrayAuxComb.sort();
            arrayAuxMotor = arrayAuxMotor.sort();
            arrayAuxModelo = arrayAuxModelo.sort();
            arrayAuxCilind = arrayAuxCilind.sort();
            arrayAuxStd = arrayAuxStd.sort();
            arrayAuxProd = arrayAuxProd.sort();
            arrayAuxApp = arrayAuxApp.sort();

            for (let i = 0; i < tam; i++) {

                if (arrayAuxLinea[i] === arrayAuxLinea[i] && arrayAuxLinea[i] !== arrayAuxLinea[i - 1]) {
                   arrayRetLinea.push(arrayAuxLinea[i]);
                }

                if (arrayAuxMarca[i] === arrayAuxMarca[i] && arrayAuxMarca[i] !== arrayAuxMarca[i - 1]) {
                    arrayRetMarca.push(arrayAuxMarca[i]);
                }

                if (arrayAuxComb[i] === arrayAuxComb[i] && arrayAuxComb[i] !== arrayAuxComb[i - 1]) {
                    arrayRetComb.push(arrayAuxComb[i]);
                }

                if (arrayAuxMotor[i] === arrayAuxMotor[i] && arrayAuxMotor[i] !== arrayAuxMotor[i - 1]) {
                    arrayRetMotor.push(arrayAuxMotor[i]);
                }

                if (arrayAuxModelo[i] === arrayAuxModelo[i] && arrayAuxModelo[i] !== arrayAuxModelo[i - 1]) {
                    arrayRetModelo.push(arrayAuxModelo[i]);
                }

                if (arrayAuxCilind[i] === arrayAuxCilind[i] && arrayAuxCilind[i] !== arrayAuxCilind[i - 1]) {
                    arrayRetCilind.push(arrayAuxCilind[i]);
                }

                if (arrayAuxStd[i] === arrayAuxStd[i] && arrayAuxStd[i] !== arrayAuxStd[i - 1]) {
                    arrayRetStd.push(arrayAuxStd[i]);
                }

                if (arrayAuxProd[i] === arrayAuxProd[i] && arrayAuxProd[i] !== arrayAuxProd[i - 1]) {
                    arrayRetProd.push(arrayAuxProd[i]);
                }

                if (arrayAuxApp[i] === arrayAuxApp[i] && arrayAuxApp[i] !== arrayAuxApp[i - 1]) {
                    arrayRetApp.push(arrayAuxApp[i]);
                }
            }

            this.columnaLinea = arrayRetLinea;
            this.columnaMarca = arrayRetMarca;
            this.columnaComb = arrayRetComb;
            this.columnaMotor = arrayRetMotor;
            this.columnaModelo = arrayRetModelo;
            this.columnaCilind = arrayRetCilind;
            this.columnaStd = arrayRetStd;
            this.columnaProd = arrayRetProd;
            this.columnaApp = arrayRetApp;

            console.log(arrayRetComb);
        }
    }



    ngOnInit() {
        this.Limpiar();
        this.Filtrar();
    }
}


