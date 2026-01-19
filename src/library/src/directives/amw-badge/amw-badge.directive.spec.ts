import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwBadgeDirective } from './amw-badge.directive';

@Component({
  template: `
    <button
      [amwBadge]="badgeContent"
      [amwBadgeColor]="badgeColor"
      [amwBadgePosition]="badgePosition"
      [amwBadgeSize]="badgeSize"
      [amwBadgeHidden]="badgeHidden"
      [amwBadgeOverlap]="badgeOverlap">
      Test Button
    </button>
  `,
  standalone: true,
  imports: [AmwBadgeDirective]
})
class TestHostComponent {
  badgeContent: string | number = '5';
  badgeColor: 'primary' | 'accent' | 'warn' = 'primary';
  badgePosition: 'above after' | 'above before' | 'below after' | 'below before' = 'above after';
  badgeSize: 'small' | 'medium' | 'large' = 'medium';
  badgeHidden = false;
  badgeOverlap = true;
}

describe('AmwBadgeDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply matBadge directive', () => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge')).toBe(true);
  });

  it('should display badge content', () => {
    component.badgeContent = '10';
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('.mat-badge-content');
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.textContent.trim()).toBe('10');
  });

  it('should display numeric badge content', () => {
    component.badgeContent = 42;
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('.mat-badge-content');
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.textContent.trim()).toBe('42');
  });

  it('should apply primary color by default', () => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-primary')).toBe(true);
  });

  it('should apply accent color', () => {
    component.badgeColor = 'accent';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-accent')).toBe(true);
  });

  it('should apply warn color', () => {
    component.badgeColor = 'warn';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-warn')).toBe(true);
  });

  it('should apply position classes for above after', () => {
    component.badgePosition = 'above after';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-above')).toBe(true);
    expect(buttonEl.classList.contains('mat-badge-after')).toBe(true);
  });

  it('should apply position classes for above before', () => {
    component.badgePosition = 'above before';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-above')).toBe(true);
    expect(buttonEl.classList.contains('mat-badge-before')).toBe(true);
  });

  it('should apply position classes for below after', () => {
    component.badgePosition = 'below after';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-below')).toBe(true);
    expect(buttonEl.classList.contains('mat-badge-after')).toBe(true);
  });

  it('should apply position classes for below before', () => {
    component.badgePosition = 'below before';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-below')).toBe(true);
    expect(buttonEl.classList.contains('mat-badge-before')).toBe(true);
  });

  it('should apply small size', () => {
    component.badgeSize = 'small';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-small')).toBe(true);
  });

  it('should apply medium size by default', () => {
    component.badgeSize = 'medium';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-medium')).toBe(true);
  });

  it('should apply large size', () => {
    component.badgeSize = 'large';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-large')).toBe(true);
  });

  it('should hide badge when badgeHidden is true', () => {
    component.badgeHidden = true;
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-hidden')).toBe(true);
  });

  it('should show badge when badgeHidden is false', () => {
    component.badgeHidden = false;
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-hidden')).toBe(false);
  });

  it('should apply overlap by default', () => {
    component.badgeOverlap = true;
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-overlap')).toBe(true);
  });

  it('should not overlap when badgeOverlap is false', () => {
    component.badgeOverlap = false;
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mat-badge-overlap')).toBe(false);
  });
});
