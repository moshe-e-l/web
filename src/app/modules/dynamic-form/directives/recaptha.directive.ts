import { Directive, Input, Renderer, ElementRef, HostListener, HostBinding, OnInit, AfterViewInit, NgZone, Injector, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, Validators } from "@angular/forms";

export interface ReCaptchaConfig {
  theme? : 'dark' | 'light';
  type? : 'audio' | 'image';
  size? : 'compact' | 'normal';
  tabindex? : number;
}
declare const grecaptcha : any;

declare global {
  interface Window {
    grecaptcha : any;
    reCaptchaLoad : () => void
  }
}
@Directive({
  selector: '[nbRecaptcha]',
})
export class ReCaptchaDirective implements OnInit,AfterViewInit {
  @Input() isSecondUse : Boolean = false;
  @Input() key : string;
  @Input() config : ReCaptchaConfig = {};
  @Input() lang : string;
  @Output() getCode = new EventEmitter();
  private widgetId : number;
  private control: FormControl;
  public token:string;
  constructor( private element : ElementRef, private  ngZone : NgZone, private injector : Injector ) {
  }
  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();
  }
  ngAfterViewInit(){
  }
  registerReCaptchaCallback() {

    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': "6LdNthAUAAAAAItribt1-VmPoOC_H5ZYrDxXaf3c",
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(
      //  document.getElementById('secondUse') 
       // (this.isSecondUse ? document.getElementById('secondUse'):
         this.element.nativeElement//) 
        , config);
    };
  }

  private render( element : HTMLElement, config ) : number {
    return grecaptcha.render(element, config);
  }
  public resetCaptcha(){
    console.log(this.isSecondUse)
    grecaptcha.reset(this.widgetId);

  }

  addScript() { 
    let script = document.createElement('script');
    const lang = '&hl=he';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);  
  }



  onExpired() {
    this.ngZone.run(() => {
   //   this.onChange(null);
    //  this.onTouched(null);
    });
  }
  
  onSuccess( token : string ) {
    this.token = token;
    this.getCode.emit(token);

    this.ngZone.run(() => {
    //  this.onChange(token);
    //  this.onTouched(token);
    });
  }

}