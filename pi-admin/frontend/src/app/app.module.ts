import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PptpdSettingsComponent} from "./components/pptpd-settings/pptpd-settings.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { StatisticsComponent } from './components/home/statistics/statistics.component';
import { PptpCommonComponent } from './vpn/pptp/components/pptp-common/pptp-common.component';
import { PptpOptionsComponent } from './vpn/pptp/components/pptp-options/pptp-options.component';
import { PptpStatisticsComponent } from './vpn/pptp/components/pptp-statistics/pptp-statistics.component';
import { PptpChapSecretsComponent } from './vpn/pptp/components/pptp-chap-secrets/pptp-chap-secrets.component';
import { PptpConfigComponent } from './vpn/pptp/components/pptp-config/pptp-config.component';
import {FormsModule} from "@angular/forms";
import { DockerLogComponent } from './components/home/docker-log/docker-log.component';

@NgModule({
    declarations: [
        AppComponent,
        PptpdSettingsComponent,
        StatisticsComponent,
        PptpCommonComponent,
        PptpOptionsComponent,
        PptpStatisticsComponent,
        PptpChapSecretsComponent,
        PptpConfigComponent,
        DockerLogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
