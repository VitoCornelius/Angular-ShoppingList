import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector : '[appPlaceholder]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef : ViewContainerRef) {} //this will give us access to the place where the directive is added 
}