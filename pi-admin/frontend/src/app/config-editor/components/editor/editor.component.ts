import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @Input() code: string
    @Input() language: string
    @Output() codeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() save: EventEmitter<string> = new EventEmitter<string>();
    public editorContainerResizeEvent: EventEmitter<any> = new EventEmitter<any>()
    public editor: any;
    public editorOptions = {theme: 'vs-dark', language: this.language || 'ini', automaticLayout: true};

    get internalCode() {
        return this.code;
    }

    set internalCode(value: string) {
        this.code = value;
        this.codeChange.emit(value)
    }

    constructor() {
    }

    ngOnInit() {
        this.editorOptions = {theme: 'vs-dark', language: this.language || 'ini', automaticLayout: true}
    }

    onInitEditor(editor) {
        this.editor = editor;
        this.editorContainerResizeEvent
            .pipe(debounceTime(1))
            .subscribe(() => {
                editor.layout()
            })
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
            this.save.emit(this.code)
        });

        this.editorOptions.theme = 'vs-light'
    }
}
