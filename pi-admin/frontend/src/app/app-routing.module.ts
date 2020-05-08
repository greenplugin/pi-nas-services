import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatisticsComponent} from "./components/home/statistics/statistics.component";
import {PptpCommonComponent} from "./vpn/pptp/components/pptp-common/pptp-common.component";


const routes: Routes = [
    {
        path: '',
        component: StatisticsComponent
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
