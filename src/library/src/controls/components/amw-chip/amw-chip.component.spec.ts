import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwChipComponent } from './amw-chip.component';

describe('AmwChipComponent', () => {
  let component: AmwChipComponent;
  let fixture: ComponentFixture<AmwChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwChipComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwChipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('label', 'Test Chip');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('.amw-chip__label');
    expect(labelEl.textContent.trim()).toBe('Angular');
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('label', 'Primary');
    fixture.componentRef.setInput('color', 'primary');
    fixture.detectChanges();

    const chipEl = fixture.nativeElement.querySelector('mat-chip');
    expect(chipEl.classList.contains('amw-chip--primary')).toBe(true);
  });

  it('should show remove button when removable', () => {
    fixture.componentRef.setInput('label', 'Removable');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('.amw-chip__remove');
    expect(removeBtn).toBeTruthy();
  });

  it('should hide remove button when not removable', () => {
    fixture.componentRef.setInput('label', 'Not Removable');
    fixture.componentRef.setInput('removable', false);
    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('.amw-chip__remove');
    expect(removeBtn).toBeFalsy();
  });

  it('should emit removed when remove button clicked', () => {
    fixture.componentRef.setInput('label', 'Removable');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const removeSpy = jasmine.createSpy('removed');
    component.removed.subscribe(removeSpy);

    const removeBtn = fixture.nativeElement.querySelector('.amw-chip__remove');
    removeBtn.click();

    expect(removeSpy).toHaveBeenCalled();
  });

  it('should toggle selected state when selectable and clicked', () => {
    fixture.componentRef.setInput('label', 'Selectable');
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    expect(component.selected()).toBe(false);

    component.onChipClick();
    expect(component.selected()).toBe(true);

    component.onChipClick();
    expect(component.selected()).toBe(false);
  });

  it('should emit selectionChange when selection changes', () => {
    fixture.componentRef.setInput('label', 'Selectable');
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const selectionSpy = jasmine.createSpy('selectionChange');
    component.selectionChange.subscribe(selectionSpy);

    component.onChipClick();

    expect(selectionSpy).toHaveBeenCalledWith(true);
  });

  it('should not toggle when not selectable', () => {
    fixture.componentRef.setInput('label', 'Not Selectable');
    fixture.componentRef.setInput('selectable', false);
    fixture.detectChanges();

    const selectionSpy = jasmine.createSpy('selectionChange');
    component.selectionChange.subscribe(selectionSpy);

    component.onChipClick();

    expect(selectionSpy).not.toHaveBeenCalled();
  });

  it('should not interact when disabled', () => {
    fixture.componentRef.setInput('label', 'Disabled');
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const selectionSpy = jasmine.createSpy('selectionChange');
    component.selectionChange.subscribe(selectionSpy);

    component.onChipClick();

    expect(selectionSpy).not.toHaveBeenCalled();
  });

  it('should show icon when provided', () => {
    fixture.componentRef.setInput('label', 'With Icon');
    fixture.componentRef.setInput('icon', 'star');
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('.amw-chip__icon');
    expect(iconEl).toBeTruthy();
    expect(iconEl.textContent.trim()).toBe('star');
  });

  it('should show avatar when provided', () => {
    fixture.componentRef.setInput('label', 'With Avatar');
    fixture.componentRef.setInput('avatar', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    const avatarEl = fixture.nativeElement.querySelector('.amw-chip__avatar');
    expect(avatarEl).toBeTruthy();
    expect(avatarEl.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should prioritize avatar over icon', () => {
    fixture.componentRef.setInput('label', 'Avatar Priority');
    fixture.componentRef.setInput('icon', 'person');
    fixture.componentRef.setInput('avatar', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    const avatarEl = fixture.nativeElement.querySelector('.amw-chip__avatar');
    const iconEl = fixture.nativeElement.querySelector('.amw-chip__icon');

    expect(avatarEl).toBeTruthy();
    expect(iconEl).toBeFalsy();
  });

  it('should apply custom class', () => {
    fixture.componentRef.setInput('label', 'Custom');
    fixture.componentRef.setInput('chipClass', 'my-custom-class');
    fixture.detectChanges();

    const chipEl = fixture.nativeElement.querySelector('mat-chip');
    expect(chipEl.classList.contains('my-custom-class')).toBe(true);
  });

  it('should handle keyboard Enter for selection', () => {
    fixture.componentRef.setInput('label', 'Keyboard');
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.selected()).toBe(true);
  });

  it('should handle keyboard Space for selection', () => {
    fixture.componentRef.setInput('label', 'Keyboard');
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.selected()).toBe(true);
  });

  it('should handle keyboard Delete for removal', () => {
    fixture.componentRef.setInput('label', 'Keyboard Delete');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const removeSpy = jasmine.createSpy('removed');
    component.removed.subscribe(removeSpy);

    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should apply selected class when selected', () => {
    fixture.componentRef.setInput('label', 'Selected');
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const chipEl = fixture.nativeElement.querySelector('mat-chip');
    expect(chipEl.classList.contains('amw-chip--selected')).toBe(true);
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('label', 'Disabled');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const chipEl = fixture.nativeElement.querySelector('mat-chip');
    expect(chipEl.classList.contains('amw-chip--disabled')).toBe(true);
  });
});
