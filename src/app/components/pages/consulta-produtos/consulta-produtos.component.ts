import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {

  produtos: any[] = [];

  constructor (private http: HttpClient) { }

  form = new FormGroup({
    nome: new FormControl('')
  });

  onSubmit() {
    this.http.get('http://localhost:8080/api/produtos/consultar/' + this.form.value.nome)
      .subscribe({
        next: (data) => {
          this.produtos = data as any[];
        }
      });
  }
}
