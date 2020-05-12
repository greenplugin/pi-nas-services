import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigTree} from "../../interfaces/config-tree";
import {ConfigService} from "../../services/config.service";
import {ConfigFile} from "../../interfaces/config-file";

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
    @Output() select: EventEmitter<ConfigFile> = new EventEmitter<ConfigFile>()
    @Output() upload: EventEmitter<ConfigFile> = new EventEmitter<ConfigFile>()
    configTree: ConfigTree

    constructor(private configService: ConfigService) {
    }

    ngOnInit(): void {
        this.loadList()
    }

    loadList() {
        this.configService.loadConfigs().subscribe((tree: ConfigTree) => {
            this.deepSort(tree)
            this.configTree = tree;
            console.info(this.configTree)
        })
    }

    deepSort(tree: ConfigTree) {
        tree.items.forEach((item: ConfigFile | ConfigTree) => {
            if (item.type === "dir") {
                this.deepSort(item);
            }
        })

        tree.items = tree.items.sort((a: ConfigFile | ConfigTree, b: ConfigFile | ConfigTree) => {
            if (a.type === 'dir' && b.type === 'file') {
                return -1
            }
            if (a.type === 'file' && b.type === 'dir') {
                return 1
            }
            return 0;
        })
    }
}
