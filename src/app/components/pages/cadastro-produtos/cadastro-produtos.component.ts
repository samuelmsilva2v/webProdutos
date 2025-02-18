import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [
    CommonModule
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

}
