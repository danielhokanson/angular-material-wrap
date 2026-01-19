import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwIconButtonComponent } from './amw-icon-button.component';

describe('AmwIconButtonComponent', () => {
  let component: AmwIconButtonComponent;
  let fixture: ComponentFixture<AmwIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwIconButtonComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwIconButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('ariaLabel', 'Home');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the icon', () => {
    fixture.componentRef.setInput('icon', 'settings');
    fixture.componentRef.setInput('ariaLabel', 'Settings');
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('mat-icon');
    expect(iconEl.textContent.trim()).toBe('settings');
  });

  it('should set aria-label on button', () => {
    fixture.componentRef.setInput('icon', 'menu');
    fixture.componentRef.setInput('ariaLabel', 'Open menu');
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.getAttribute('aria-label')).toBe('Open menu');
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('icon', 'delete');
    fixture.componentRef.setInput('ariaLabel', 'Delete');
    fixture.componentRef.setInput('color', 'warn');
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('amw-icon-button--warn')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('icon', 'star');
    fixture.componentRef.setInput('ariaLabel', 'Star');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('amw-icon-button--lg')).toBe(true);
  });

  it('should disable button when disabled is true', () => {
    fixture.componentRef.setInput('icon', 'edit');
    fixture.componentRef.setInput('ariaLabel', 'Edit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.disabled).toBe(true);
  });

  it('should disable button when loading is true', () => {
    fixture.componentRef.setInput('icon', 'save');
    fixture.componentRef.setInput('ariaLabel', 'Save');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.disabled).toBe(true);
  });

  it('should show spinner when loading', () => {
    fixture.componentRef.setInput('icon', 'refresh');
    fixture.componentRef.setInput('ariaLabel', 'Refresh');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinnerEl = fixture.nativeElement.querySelector('amw-progress-spinner');
    expect(spinnerEl).toBeTruthy();
  });

  it('should hide icon when loading', () => {
    fixture.componentRef.setInput('icon', 'cloud');
    fixture.componentRef.setInput('ariaLabel', 'Cloud');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('mat-icon');
    expect(iconEl).toBeFalsy();
  });

  it('should emit buttonClick on click', () => {
    fixture.componentRef.setInput('icon', 'add');
    fixture.componentRef.setInput('ariaLabel', 'Add');
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy('buttonClick');
    component.buttonClick.subscribe(clickSpy);

    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit buttonClick when disabled', () => {
    fixture.componentRef.setInput('icon', 'close');
    fixture.componentRef.setInput('ariaLabel', 'Close');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy('buttonClick');
    component.buttonClick.subscribe(clickSpy);

    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should have correct button type', () => {
    fixture.componentRef.setInput('icon', 'submit');
    fixture.componentRef.setInput('ariaLabel', 'Submit');
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.type).toBe('submit');
  });

  it('should default to button type', () => {
    fixture.componentRef.setInput('icon', 'action');
    fixture.componentRef.setInput('ariaLabel', 'Action');
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.type).toBe('button');
  });
});
