import {  ControlValueAccessor } from '@angular/forms';
import {   Directive, HostListener, ElementRef } from '@angular/core';
import {  NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[type=file][ngModel][observeFiles]',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileAccessorDirective,
    multi: true
  }]
})
export class FileAccessorDirective implements ControlValueAccessor {

  private elementRef: ElementRef;
  private onChangeCallback: any;
  private onTouchedCallback: any;

  @HostListener('blur') onBlur(): void {
    this.onTouchedCallback('yellow');
  }

  @HostListener('change', ['$event.target.files']) onChange(files): void {
    this.handleChange( files );
  }

  constructor(elementRef: ElementRef) {

    this.elementRef = elementRef;
    this.onChangeCallback = noop;
    this.onTouchedCallback = noop;

  }


  public handleChange(files: FileList): void {
    if (this.elementRef.nativeElement.multiple) {
      this.onChangeCallback(Array.from(files));
    } else {
      this.onChangeCallback(files.length ? files[0] : null);
    }

  }

  public registerOnChange(callback: any): void {

    this.onChangeCallback = callback;

  }


  public registerOnTouched(callback: any): void {

    this.onTouchedCallback = callback;

  }


  public setDisabledState(isDisabled: boolean): void {

    this.elementRef.nativeElement.setAttribute('disabled', isDisabled);

  }


  public writeValue(value: any): void {

    if (value instanceof FileList) {

      this.elementRef.nativeElement.setAttribute('files', value);

    } else if (Array.isArray(value) && !value.length) {

      this.elementRef.nativeElement.setAttribute('files', null);

    } else if (value === null) {

      this.elementRef.nativeElement.setAttribute('files', null);

    } else {

      if (console && console.warn && console.log) {

        console.warn('Ignoring attempt to assign non-FileList to input[type=file].');
        console.log('Value:', value);

      }

    }

  }

}
