import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { MenuComponent } from './menu/menu.component';
import { MapaService } from './mapa/mapa.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ContatoComponent } from './contato/contato.component';
import { CadeiaProdutivaComponent } from './mapa/cadeia-produtiva/cadeia-produtiva.component';
import { SetorEconomiaComponent } from './mapa/setor-economia/setor-economia.component';
import { AreaConhecimentoComponent } from './mapa/area-conhecimento/area-conhecimento.component';
import { LoaderComponent } from './shared/loader/loader.component';
@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MenuComponent,
    FooterComponent,
    ContatoComponent,
    CadeiaProdutivaComponent,
    SetorEconomiaComponent,
    AreaConhecimentoComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRNFEpWt51M7kEXFWOn2ZwsMBTRKdzAGg'
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [MapaService, ToastyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
