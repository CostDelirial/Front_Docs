import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  

  constructor(  ) { }


  async actualizarPDF( archivo: File, id: string ){

    try{

      const url = `${base_url}/upload/${id}`;
      const formData = new FormData();
      formData.append('dirDoc', archivo);
      const resp= await fetch( url,
         {
           method: 'PUT',
           headers: {
             'x-token': localStorage.getItem('token') || ''
           },
           body: formData
         });

         const data  = resp.json();

         return data;

    }catch( error ){
      console.log(`es desde error${error}`);
      return false;
    }

  }

}
