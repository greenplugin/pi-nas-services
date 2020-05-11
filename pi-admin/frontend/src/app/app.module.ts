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
import { DockerContainerCommonComponent } from './docker/components/docker-container-common/docker-container-common.component';
import { DockerContainerLogComponent } from './docker/components/docker-container-log/docker-container-log.component';
import { DockerContainerConsoleComponent } from './docker/components/docker-container-console/docker-container-console.component';
import { DockerContainerSummaryComponent } from './docker/components/docker-container-summary/docker-container-summary.component';
import { ConfDefaultComponent } from './components/conf-default/conf-default.component';
import {DlnaCommonComponent} from "./multimedia/components/dlna-common/dlna-common.component";
import {NgTerminalModule} from "ng-terminal";
import { DockerTerminalComponent } from './docker/components/docker-terminal/docker-terminal.component';

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
        DockerLogComponent,
        DockerContainerCommonComponent,
        DockerContainerLogComponent,
        DockerContainerConsoleComponent,
        DockerContainerSummaryComponent,
        ConfDefaultComponent,
        DlnaCommonComponent,
        DockerTerminalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        NgTerminalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
