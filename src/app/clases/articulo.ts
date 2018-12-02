export class Articulo {
    constructor(
        public id: string,
        public material: string,
        public descripcion_corta: string,
        public producto: string,
        public aplicación: string,
        public linea: string,
        public marca: string,
        public combustible: string,
        public motor: string,
        public modelo: string,
        public cilindrada: string,
        public lts: string,
        public competicion: string,
        public cant_valvulas: string,
        public img_peq_url: string,
        public img_gde_url: string,
        public unidad_o_kit: string,
        public cant_kit: string,
        public pack_venta: string,
        public precio_lista: string,
        public stock: string,
        public pdf_catalogo: string,
        public codigo_kit_motor: string,
        public art_relacionados: string,
        public en_promocion: string,
        public nuevo_lanzamiento: string,
        public no_comercializable: string
    ) { }
}
