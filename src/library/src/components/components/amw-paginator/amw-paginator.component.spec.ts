import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AmwPaginatorComponent } from './amw-paginator.component';

describe('AmwPaginatorComponent', () => {
  let component: AmwPaginatorComponent;
  let fixture: ComponentFixture<AmwPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwPaginatorComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default length of 0', () => {
    expect(component.length()).toBe(0);
  });

  it('should have default pageSize of 10', () => {
    expect(component.pageSize()).toBe(10);
  });

  it('should have default pageIndex of 0', () => {
    expect(component.pageIndex()).toBe(0);
  });

  it('should have default pageSizeOptions', () => {
    expect(component.pageSizeOptions()).toEqual([5, 10, 25, 50]);
  });

  it('should have default showFirstLastButtons of false', () => {
    expect(component.showFirstLastButtons()).toBe(false);
  });

  it('should have default hidePageSize of false', () => {
    expect(component.hidePageSize()).toBe(false);
  });

  it('should have default disabled of false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should render mat-paginator element', () => {
    const paginatorEl = fixture.nativeElement.querySelector('mat-paginator');
    expect(paginatorEl).toBeTruthy();
  });

  it('should emit page event on page change', () => {
    const pageSpy = jasmine.createSpy('page');
    component.page.subscribe(pageSpy);

    const mockEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 100,
      previousPageIndex: 0
    };

    component.onPageChange(mockEvent);

    expect(pageSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should accept length input', () => {
    fixture.componentRef.setInput('length', 100);
    fixture.detectChanges();
    expect(component.length()).toBe(100);
  });

  it('should accept pageSize input', () => {
    fixture.componentRef.setInput('pageSize', 25);
    fixture.detectChanges();
    expect(component.pageSize()).toBe(25);
  });

  it('should accept pageIndex input', () => {
    fixture.componentRef.setInput('pageIndex', 2);
    fixture.detectChanges();
    expect(component.pageIndex()).toBe(2);
  });

  it('should accept pageSizeOptions input', () => {
    const options = [10, 20, 50, 100];
    fixture.componentRef.setInput('pageSizeOptions', options);
    fixture.detectChanges();
    expect(component.pageSizeOptions()).toEqual(options);
  });

  it('should accept showFirstLastButtons input', () => {
    fixture.componentRef.setInput('showFirstLastButtons', true);
    fixture.detectChanges();
    expect(component.showFirstLastButtons()).toBe(true);
  });

  it('should accept hidePageSize input', () => {
    fixture.componentRef.setInput('hidePageSize', true);
    fixture.detectChanges();
    expect(component.hidePageSize()).toBe(true);
  });

  it('should accept disabled input', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.disabled()).toBe(true);
  });

  it('should apply custom class', () => {
    fixture.componentRef.setInput('paginatorClass', 'my-custom-paginator');
    fixture.detectChanges();

    const classes = component.paginatorClasses();
    expect(classes).toContain('my-custom-paginator');
  });
});
