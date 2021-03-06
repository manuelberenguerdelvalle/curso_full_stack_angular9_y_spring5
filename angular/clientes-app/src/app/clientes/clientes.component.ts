import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {
  }
  ngOnInit() {
    this.clienteService.getClientes().pipe(
      //el tap puede ejecutarse varias veces y ejecutar varios procesos
      tap(clientes => {
        this.clientes = clientes
        console.log('ClienteComponent: tap3')
        clientes.forEach( cliente => {
            console.log(cliente.nombre);
          });
        })
    ).subscribe();
  }

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Está seguro?',
    text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?` ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.clienteService.delete(cliente.id).subscribe(
        response =>{
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito.`,
            'success'
          )
        }
      )
    }
  })
    }
}
