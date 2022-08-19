import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropDownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false

    ngOnInit(): void {}

    @HostListener('click') mouseEnter() {
        this.isOpen = !this.isOpen
    } 
}