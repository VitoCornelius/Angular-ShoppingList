import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent {
    collapsed = true;

    @Output('featureSelected') featureSelected = new EventEmitter<string>();

    onSelect(type : string) { 
        this.featureSelected.emit(type);
    }

} 