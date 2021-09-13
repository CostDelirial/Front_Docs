import { environment } from '../../environments/environment';

const base_url = environment.base_url 

export class Doc{
    
    constructor(
        public fecha: string,
        public expediente: string,
        public documento: string,
        public folioSSE: string,
        public numeroGESSM: number,
        public numeroSSM: number,
        public numeroSSS: number,
        public numeroArchivo: number,
        public asunto: string,
        public atecionAcuerdo: string,
        public areaResponsable: string, 
        public estatus?: string,
        public dirDoc?: string,
        //
        public respuesta?: string,
        public numeroResultado?: number,
        public fechaResultado?: string,
        public archivoResultado?: string,
        //
        public depto?: string,
        public supervisor?: string,
        public administrador?: string,
    ){}

    get mostrarDoc(){
        ///upload/docs/
        if( this.dirDoc ){
            return `${ base_url }/uploads/docs/${this.dirDoc}`
        }else{
            return `${ base_url }/uploads/docs/SIN_DOCUMENTO.pdf`
        }
    }
}