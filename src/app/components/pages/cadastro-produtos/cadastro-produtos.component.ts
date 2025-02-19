import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  categorias: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    
    this.http.get('http://localhost:8080/api/categorias/consultar')
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

  onSubmit() {

    this.http.post('http://localhost:8080/api/produtos/cadastrar', this.form.value, {responseType: 'text'})
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.error(e.error);
        }
      });
  }
}
