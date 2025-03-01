import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';

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

  // Atributos
  produtos: any[] = [];
  mensagem: string = '';

  // Construtores
  constructor (private http: HttpClient) { }

  form = new FormGroup({
    nome: new FormControl('')
  });


  // Função executada ao enviar o formulário
  onSubmit() {
    this.http.get(`${endpoints.consultar_produtos}/${this.form.value.nome}`)
      .subscribe({
        next: (data) => {
          this.produtos = data as any[];
        }
      });
  }

  // Função executada ao clicar no botão de excluir
  onDelete(id: string) {
    
    if(confirm('Deseja realmente excluir este produto?')) {

      this.http.delete(`${endpoints.excluir_produto}/${id}`, { responseType: 'text' })
        .subscribe({
          next: (data) => {
            this.mensagem = data;
            this.onSubmit();
          }
        });
    } 
  }
}
