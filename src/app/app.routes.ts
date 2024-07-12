import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductViewComponent } from "./pages/product/product-view/product-view.component";
import { ConfigurationListComponent } from "./pages/configuration/configuration-list/configuration-list.component";
import { ConfigurationFormComponent } from "./pages/configuration/configuration-form/configuration-form.component";
import { ConfigurationDetailComponent } from "./pages/configuration/configuration-detail/configuration-detail.component";
import { ProductNewComponent } from "./pages/product/product-new/product-new.component";

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductNewComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/view/:id', component: ProductViewComponent },
  { path: 'configurations', component: ConfigurationListComponent },
  { path: 'configuration/new', component: ConfigurationFormComponent },
  { path: 'configuration/edit/:id', component: ConfigurationFormComponent },
  { path: 'configuration/:id', component: ConfigurationDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];
