import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { MenuComponent } from './menu/menu.component';
import { MapaService } from './mapa/mapa.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MenuComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRNFEpWt51M7kEXFWOn2ZwsMBTRKdzAGg'
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [MapaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
