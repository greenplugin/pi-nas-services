import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../../../services/menu.service";
import {
    MenuItemConfigurationInterface,
    MenuItemExternalInterface,
    MenuItemIframeInterface
} from "../../../interfaces/menu-section-interface";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-service-iframe-common',
    templateUrl: './service-iframe-common.component.html',
    styleUrls: ['./service-iframe-common.component.scss']
})
export class ServiceIframeCommonComponent implements OnInit {
    private route: string
    public path?: SafeResourceUrl;

    constructor(route: ActivatedRoute, menuService: MenuService, domSanitizer: DomSanitizer) {
        route.params.subscribe(params => {
            this.route = params.menuId
            menuService.getMenu().subscribe((menu) => {
                menu.forEach(menuRow => {
                    menuRow.items
                        .forEach(item => {
                            if (item.route === this.route && item.type === "iframe") {
                                this.path = domSanitizer.bypassSecurityTrustResourceUrl(item.path)
                            }
                        })
                })
            })
        })
    }

    ngOnInit(): void {
    }

}
