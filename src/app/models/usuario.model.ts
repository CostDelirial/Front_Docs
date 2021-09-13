export class Usuario {

    constructor(
        public nombre: string,
        public control: number,
        public password?: string,
        public status?: string,
        public role?: string,
        public uid?: string,
        public fechaInicio?: string,
    ) { }

    imprimirUsuario(){
        console.log( this.nombre);
    }
}