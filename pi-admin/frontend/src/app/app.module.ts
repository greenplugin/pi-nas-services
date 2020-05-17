import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PptpdSettingsComponent} from "./components/pptpd-settings/pptpd-settings.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { StatisticsComponent } from './components/home/statistics/statistics.component';
import {FormsModule} from "@angular/forms";
import { DockerLogComponent } from './components/home/docker-log/docker-log.component';
import { DockerContainerCommonComponent } from './docker/components/docker-container-common/docker-container-common.component';
import { DockerContainerLogComponent } from './docker/components/docker-container-log/docker-container-log.component';
import { DockerContainerConsoleComponent } from './docker/components/docker-container-console/docker-container-console.component';
import { DockerContainerSummaryComponent } from './docker/components/docker-container-summary/docker-container-summary.component';
import { ConfDefaultComponent } from './components/conf-default/conf-default.component';
import {NgTerminalModule} from "ng-terminal";
import { DockerTerminalComponent } from './docker/components/docker-terminal/docker-terminal.component';
import { TreeComponent } from './config-editor/components/tree/tree.component';
import { EditorComponent } from './config-editor/components/editor/editor.component';
import { TreeNodeComponent } from './config-editor/components/tree-node/tree-node.component';
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {AngularResizedEventModule} from "angular-resize-event";
import { EditorCommonComponent } from './config-editor/components/editor-common/editor-common.component';
import { ServiceSettingsCommonComponent } from './service-settings/components/service-settings-common/service-settings-common.component';
import { ServiceIframeCommonComponent } from './service-iframe/components/service-iframe-common/service-iframe-common.component';

const monacoConfig: NgxMonacoEditorConfig = {
    baseUrl: 'assets',
    defaultOptions: { scrollBeyondLastLine: false },
};


@NgModule({
    declarations: [
        AppComponent,
        PptpdSettingsComponent,
        StatisticsComponent,
        DockerLogComponent,
        DockerContainerCommonComponent,
        DockerContainerLogComponent,
        DockerContainerConsoleComponent,
        DockerContainerSummaryComponent,
        ConfDefaultComponent,
        DockerTerminalComponent,
        TreeComponent,
        EditorComponent,
        TreeNodeComponent,
        EditorCommonComponent,
        ServiceSettingsCommonComponent,
        ServiceIframeCommonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        NgTerminalModule,
        MonacoEditorModule.forRoot(monacoConfig),
        AngularResizedEventModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
