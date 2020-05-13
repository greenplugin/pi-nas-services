import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {ConfigFile} from "../../interfaces/config-file";
import {FullFile} from "../../interfaces/full-file";
import {FullFiles} from "../../interfaces/full-files";
import {extensionsMap} from "./extensions";

@Component({
    selector: 'app-editor-common',
    templateUrl: './editor-common.component.html',
    styleUrls: ['./editor-common.component.scss']
})
export class EditorCommonComponent implements OnInit {
    files: FullFiles = {};
    selectedTab: number = 0;
    extensionsMap: { [key: string]: string } = extensionsMap

    get filesArray(): FullFile[] {
        const array = Object.values(this.files).filter(file => !file.closed);
        if (this.selectedTab > array.length - 1) {
            this.selectedTab = 0;
        }
        return array
    }

    constructor(private configService: ConfigService) {
    }

    ngOnInit(): void {
        this.loadList()
    }

    loadList() {
    }

    open(file: ConfigFile) {
        let fullFile = this.files[file.path];

        if (!fullFile) {
            fullFile = this.files[file.path] = {
                initialContent: '',
                content: '',
                options: file,
                closed: false,
                suggestedLanguage: this.extensionsMap[file.name.replace(/.+(?=\.\w+$)/mg, '')] || 'ini'
            }
            this.loadFile(fullFile)
        } else {
            fullFile.closed = false;
        }

        this.selectedTab = this.filesArray.findIndex((item: FullFile) => item.options.id === fullFile.options.id)
    }

    upload(file: ConfigFile) {
        const fullFile = this.files[file.path];
        this.configService.uploadFile(fullFile).subscribe(() => {
            this.loadFile(fullFile)
        })
    }

    loadFile(file: FullFile) {
        this.configService.loadFile(file.options.id)
            .subscribe(content => {
                file.initialContent = content;
                file.content = content;
                file.options.isChanged = false;
            })
    }

    closeFile(file: FullFile) {
        file.closed = true;
    }

    fileChanged(file: FullFile, content: string) {
        if (file.content !== content) {
            file.content = content;
        }

        if (file.initialContent !== file.content) {
            file.options.isChanged = true;
        } else {
            file.options.isChanged = false;
        }
    }

    selectTab(index: number) {
        this.selectedTab = index;
    }
}
