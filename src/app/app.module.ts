import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { PokerLobbyComponent } from './poker-lobby/poker-lobby.component';
import {FormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PokerResultComponent } from './poker-result/poker-result.component';

@NgModule({ declarations: [
        AppComponent,
        PokerTableComponent,
        PokerLobbyComponent,
        PokerResultComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
