import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations : [
        AlertComponent, 
        LoadingSpinner, 
        PlaceholderDirective,
        DropdownDirective
    ], 
    imports : [
        CommonModule //use the common module instead of BrowerModule 
    ], 
    exports : [
        AlertComponent, 
        LoadingSpinner, 
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}