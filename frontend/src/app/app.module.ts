import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderComponent } from './componentes/loader/loader.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/index/index.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { BoardComponent } from './componentes/board/board.component';
import { CardsComponent } from './componentes/board/cards/cards.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './componentes/profile/profile.component';
import { TodoComponent } from './componentes/board/todo/todo.component';
import { CarrouselComponent } from './componentes/home/carrousel/carrousel.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BoardService } from "./servicios/board.service";
import {HttpClientModule} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {AuthGuard} from "./auth.guard";
import {RouterModule} from "@angular/router";
import { DarkmodeComponent } from './componentes/darkmode/darkmode.component';
import {CardService} from "./servicios/card.service";
import {LocalstorageService} from "./servicios/localstorage.service";
import {UsuarioService} from "./servicios/usuario.service";
import {ModoOscuroService} from "./servicios/modooscuro.service";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    IndexComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    CardsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    TodoComponent,
    CarrouselComponent,
    DarkmodeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    BoardService,
    JwtHelperService,
    CardService,
    LocalstorageService,
    UsuarioService,
    ModoOscuroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
