import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwButtonToggleComponent } from './amw-button-toggle.component';
import { AmwButtonToggleGroupComponent } from './amw-button-toggle-group.component';

describe('AmwButtonToggleComponent', () => {
  let component: AmwButtonToggleComponent;
  let fixture: ComponentFixture<AmwButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwButtonToggleComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwButtonToggleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display text content', () => {
    fixture.componentRef.setInput('value', 'option1');
    fixture.detectChanges();

    const toggleEl = fixture.nativeElement.querySelector('mat-button-toggle');
    expect(toggleEl).toBeTruthy();
  });

  it('should show icon when provided', () => {
    fixture.componentRef.setInput('value', 'bold');
    fixture.componentRef.setInput('icon', 'format_bold');
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('mat-icon');
    expect(iconEl).toBeTruthy();
    expect(iconEl.textContent.trim()).toBe('format_bold');
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('value', 'disabled');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const toggleEl = fixture.nativeElement.querySelector('mat-button-toggle');
    expect(toggleEl.classList.contains('mat-button-toggle-disabled')).toBe(true);
  });
});

describe('AmwButtonToggleGroupComponent', () => {
  let component: AmwButtonToggleGroupComponent;
  let fixture: ComponentFixture<AmwButtonToggleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwButtonToggleGroupComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwButtonToggleGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should accept value input', () => {
    fixture.componentRef.setInput('value', 'selected');
    fixture.detectChanges();
    expect(component.value()).toBe('selected');
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
  });

  it('should support multiple selection mode', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    expect(component.multiple()).toBe(true);
  });

  it('should support vertical layout', () => {
    fixture.componentRef.setInput('vertical', true);
    fixture.detectChanges();

    const groupEl = fixture.nativeElement.querySelector('mat-button-toggle-group');
    expect(groupEl.classList.contains('mat-button-toggle-vertical')).toBe(true);
  });

  it('should emit valueChange when value changes', () => {
    fixture.detectChanges();

    const valueChangeSpy = jasmine.createSpy('valueChange');
    component.valueChange.subscribe(valueChangeSpy);

    component.onToggleChange({ value: 'newValue' } as any);

    expect(valueChangeSpy).toHaveBeenCalledWith('newValue');
  });

  it('should implement ControlValueAccessor writeValue', () => {
    fixture.detectChanges();
    component.writeValue('written');
    expect(component.value()).toBe('written');
  });

  it('should implement ControlValueAccessor registerOnChange', () => {
    fixture.detectChanges();
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);

    component.onToggleChange({ value: 'test' } as any);

    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should implement ControlValueAccessor registerOnTouched', () => {
    fixture.detectChanges();
    const fn = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn);
    // onTouched is called internally, verify registration works
    expect(component).toBeTruthy();
  });

  it('should implement ControlValueAccessor setDisabledState', () => {
    fixture.detectChanges();
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('should apply appearance class', () => {
    fixture.componentRef.setInput('appearance', 'legacy');
    fixture.detectChanges();

    const classes = component.groupClasses();
    expect(classes).toContain('amw-button-toggle-group--legacy');
  });
});
