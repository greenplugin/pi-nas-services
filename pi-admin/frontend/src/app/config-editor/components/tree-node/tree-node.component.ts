import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigTree} from "../../interfaces/config-tree";
import {ConfigFile} from "../../interfaces/config-file";

@Component({
    selector: 'app-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {
    @Input() tree: ConfigTree
    @Output() select: EventEmitter<ConfigFile> = new EventEmitter()
    @Output() upload: EventEmitter<ConfigFile> = new EventEmitter()

    constructor() {
    }

    ngOnInit() {
    }

}
