import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // Atributos
  dados: any[] = [];

  // Construtores
  constructor(private http: HttpClient) { }

  // Método executado ao abrir a página
  ngOnInit() {
    
    // Executando uma requisição GET para a API
    this.http.get(endpoints.dashboard_categorias)
    .subscribe({
      next: (data) => {
        this.dados = data as any[];
      }
    })

  
  }
}
