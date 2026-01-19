import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwListComponent } from './amw-list.component';
import { AmwListItemComponent } from './amw-list-item.component';

describe('AmwListComponent', () => {
  let component: AmwListComponent;
  let fixture: ComponentFixture<AmwListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwListComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default dense value of false', () => {
    expect(component.dense()).toBe(false);
  });

  it('should have default disableRipple value of false', () => {
    expect(component.disableRipple()).toBe(false);
  });

  it('should apply dense class when dense is true', () => {
    fixture.componentRef.setInput('dense', true);
    fixture.detectChanges();

    const classes = component.listClasses();
    expect(classes).toContain('amw-list--dense');
  });

  it('should apply no-ripple class when disableRipple is true', () => {
    fixture.componentRef.setInput('disableRipple', true);
    fixture.detectChanges();

    const classes = component.listClasses();
    expect(classes).toContain('amw-list--no-ripple');
  });

  it('should render mat-list element', () => {
    const listEl = fixture.nativeElement.querySelector('mat-list');
    expect(listEl).toBeTruthy();
  });
});

describe('AmwListItemComponent', () => {
  let component: AmwListItemComponent;
  let fixture: ComponentFixture<AmwListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwListItemComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default disabled value of false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have default selected value of false', () => {
    expect(component.selected()).toBe(false);
  });

  it('should apply disabled class when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const classes = component.itemClasses();
    expect(classes).toContain('amw-list-item--disabled');
  });

  it('should apply selected class when selected is true', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const classes = component.itemClasses();
    expect(classes).toContain('amw-list-item--selected');
  });

  it('should not have routerLink class when routerLink is not provided', () => {
    const classes = component.itemClasses();
    expect(classes).not.toContain('amw-list-item--link');
  });

  it('should have routerLink class when routerLink is provided', () => {
    fixture.componentRef.setInput('routerLink', '/home');
    fixture.detectChanges();

    const classes = component.itemClasses();
    expect(classes).toContain('amw-list-item--link');
  });

  it('should render mat-list-item element', () => {
    const itemEl = fixture.nativeElement.querySelector('mat-list-item');
    expect(itemEl).toBeTruthy();
  });

  it('should emit itemClick on click', () => {
    const clickSpy = jasmine.createSpy('itemClick');
    component.itemClick.subscribe(clickSpy);

    component.onClick(new MouseEvent('click'));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit itemClick when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy('itemClick');
    component.itemClick.subscribe(clickSpy);

    component.onClick(new MouseEvent('click'));

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
