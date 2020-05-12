import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PptpCommonComponent} from "./vpn/pptp/components/pptp-common/pptp-common.component";
import {DockerLogComponent} from "./components/home/docker-log/docker-log.component";
import {DockerContainerCommonComponent} from "./docker/components/docker-container-common/docker-container-common.component";
import {DockerContainerSummaryComponent} from "./docker/components/docker-container-summary/docker-container-summary.component";
import {DockerContainerLogComponent} from "./docker/components/docker-container-log/docker-container-log.component";
import {DockerContainerConsoleComponent} from "./docker/components/docker-container-console/docker-container-console.component";
import {DlnaCommonComponent} from "./multimedia/components/dlna-common/dlna-common.component";
import {CommonComponent as ConfigEditorCommon} from "./config-editor/common/common.component";


const routes: Routes = [
    {
        path: '',
        component: DockerLogComponent
    },
    {
        path: 'pptp',
        component: PptpCommonComponent
    },
    {
        path: 'docker/container/:id',
        component: DockerContainerCommonComponent,
        children: [
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'prefix'
            },
            {
                path: 'summary',
                component: DockerContainerSummaryComponent
            },
            {
                path: 'log',
                component: DockerContainerLogComponent
            },
            {
                path: 'console',
                component: DockerContainerConsoleComponent
            }
        ]
    },
    {
        path: 'config-editor',
        component: ConfigEditorCommon
    },
    {
        path: 'dlna',
        component: DlnaCommonComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
