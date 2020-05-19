import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DockerLogComponent} from "./components/home/docker-log/docker-log.component";
import {DockerContainerCommonComponent} from "./docker/components/docker-container-common/docker-container-common.component";
import {DockerContainerSummaryComponent} from "./docker/components/docker-container-summary/docker-container-summary.component";
import {DockerContainerLogComponent} from "./docker/components/docker-container-log/docker-container-log.component";
import {DockerContainerConsoleComponent} from "./docker/components/docker-container-console/docker-container-console.component";
import {EditorCommonComponent} from "./config-editor/components/editor-common/editor-common.component";
import {ServiceSettingsCommonComponent} from "./service-settings/components/service-settings-common/service-settings-common.component";
import {ServiceIframeCommonComponent} from "./service-iframe/components/service-iframe-common/service-iframe-common.component";
import {DeviceCommonComponent} from "./device/components/device-common/device-common.component";


const routes: Routes = [
    {
        path: '',
        component: DockerLogComponent
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
        component: EditorCommonComponent
    },
    {
        path: 'configuration/:menuId',
        component: ServiceSettingsCommonComponent
    },
    {
        path: 'external-service/:menuId',
        component: ServiceIframeCommonComponent
    },
    {
        path: 'device-info',
        component: DeviceCommonComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
