import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PptpCommonComponent} from "./vpn/pptp/components/pptp-common/pptp-common.component";
import {DockerLogComponent} from "./components/home/docker-log/docker-log.component";


const routes: Routes = [
    {
        path: '',
        component: DockerLogComponent
    },
    {
        path: 'pptp',
        component: PptpCommonComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
