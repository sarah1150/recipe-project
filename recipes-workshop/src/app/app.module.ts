import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ar_EG } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZorroModule } from './shared/zorro.module';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(ar);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ZorroModule,
   NgxPaginationModule
  ],
  providers: [{ provide: NZ_I18N, useValue: ar_EG }],
  bootstrap: [AppComponent],
})
export class AppModule {}
