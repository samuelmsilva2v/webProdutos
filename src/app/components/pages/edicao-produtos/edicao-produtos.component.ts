import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-edicao-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {

  // Atributos
  id: string = '';
  categorias: any[] = [];
  erros: any = null;
  mensagem: string = '';

  // Construtores
  constructor(
    private http: HttpClient,
    private activated: ActivatedRoute
  ) { }

  // Função executada ao abrir a página
  ngOnInit() {
    
    // Capturando o id enviado pela URL
    this.id = this.activated.snapshot.paramMap.get('id') as string;

    // Consultando os dados do produto através do ID
    this.http.get(`${endpoints.obter_produto}/${this.id}`)
      .subscribe({
        next: (data: any) => {
          this.form.controls.nome.setValue(data.nome);
          this.form.controls.preco.setValue(data.preco);
          this.form.controls.quantidade.setValue(data.quantidade);
          this.form.controls.categoriaId.setValue(data.categoria.id);
      }
    });

    this.http.get(endpoints.consultar_categorias)
      .subscribe({
        next: (data: any) => {
          this.categorias = data as any[];
        }
      });
  }

  form = new FormGroup({
    nome: new FormControl(''),
    quantidade: new FormControl(''),
    preco: new FormControl(''),
    categoriaId: new FormControl('')
  });

  onSubmit() {

    this.http.put(`${endpoints.atualizar_produto}/${this.id}`, this.form.value, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.erros = null;

          this.mensagem = data;
        },
        error: (e) => {
          this.erros = JSON.parse(e.error);
          this.mensagem = '';
        }
      });
  }
}
