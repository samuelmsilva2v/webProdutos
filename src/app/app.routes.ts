import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';

export const routes: Routes = [
    {
        path: 'pages/cadastro-produtos',
        component: CadastroProdutosComponent
    },
    {
        path: 'pages/consulta-produtos',
        component: ConsultaProdutosComponent
    },
    {
        path: 'pages/edicao-produtos',
        component: EdicaoProdutosComponent
    }
];
