import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector : 'app-alert',
    templateUrl : './alert.component.html',
    styleUrls : ['./alert.component.css']
})
export class AlertComponent {
    @Input() message : string;
    @Output() close = new EventEmitter<void>(); //we have to use the subject in case we want to manually listen to the events 

    onClose() {
        this.close.emit();
    }
}