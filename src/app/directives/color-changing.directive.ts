import { OnInit, ElementRef, Renderer2, HostListener, Directive, Input } from '@angular/core';
 
@Directive({
    selector : '[colorChangingDirective]'
})

export class ColorChangingDirective implements OnInit{
    constructor(private eleRef : ElementRef, private renderer : Renderer2){

    }

    @Input('colorChangingDirective') isSelected : boolean;

    ngOnInit(){
  
    }

    // @HostListener('mouseenter') mouseover(){
    //     this.renderer.setStyle(this.eleRef.nativeElement, 'background', 'grey');
    // }waitbetichod jladi kar

    @HostListener('mouseleave') mouseleave(){
        if(!this.isSelected)
        {
            this.renderer.removeClass(this.eleRef.nativeElement, 'greyBg');
        }
        
    }

    @HostListener('mouseenter') mouseover(){
        if(!this.isSelected)
        {
            this.renderer.addClass(this.eleRef.nativeElement, 'greyBg');
        }
        
    }



}