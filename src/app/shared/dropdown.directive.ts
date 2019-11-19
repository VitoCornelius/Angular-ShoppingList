import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false; // this will not be attached in the first place 

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}