import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  // Atributos
  categorias: any[] = [];
  erros: any = null;
  mensagem: string = '';

  // Construtores
  constructor(private http: HttpClient) { }

  // Função executada ao abrir a página
  ngOnInit() { 
    
    // Fazendo uma requisição GET para a API para obter as categorias
    this.http.get(endpoints.consultar_categorias)
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        }
      });
  }
  
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    categoriaId: new FormControl('', Validators.required)
  });

  // Função executada ao enviar o formulário
  onSubmit() {

    // Fazendo uma requisição POST para a API para cadastrar
    this.http.post(endpoints.cadastrar_produto, this.form.value, {responseType: 'text'})
      .subscribe({
        next: (data) => {

          this.erros = null;

          this.mensagem = data;

          this.form.reset();
        },
        error: (e) => {
          this.erros = JSON.parse(e.error);
          this.mensagem = '';
        }
      });
  }
}
