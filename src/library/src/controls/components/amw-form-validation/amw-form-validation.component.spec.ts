import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { AmwFormValidationComponent } from './amw-form-validation.component';
import { FormValidationConfig } from './interfaces';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AmwFormValidationComponent', () => {
  let component: AmwFormValidationComponent;
  let fixture: ComponentFixture<AmwFormValidationComponent>;
  let formBuilder: FormBuilder;
  let testForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AmwFormValidationComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AmwFormValidationComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    // Create a test form with password matching validator
    testForm = formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [passwordMatchValidator]
    });

    component.form = testForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show errors initially when form is untouched', () => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'touched';
    fixture.detectChanges();

    expect(component.visibleErrors.length).toBe(0);
  });

  it('should show errors when form has errors and is touched', () => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'touched';

    // Set mismatched passwords
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');
    testForm.markAsTouched();

    fixture.detectChanges();

    expect(component.visibleErrors.length).toBe(1);
    expect(component.visibleErrors[0].message).toBe('Passwords do not match');
  });

  it('should hide errors when showWhen condition is false', () => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        showWhen: (form) => form.get('confirmPassword')?.touched ?? false,
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'always';

    // Set mismatched passwords but don't touch confirmPassword
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    fixture.detectChanges();

    expect(component.visibleErrors.length).toBe(0);
  });

  it('should call custom message function with form parameter', () => {
    const messageSpy = jasmine.createSpy('message').and.returnValue('Custom error message');
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: messageSpy,
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'always';

    // Set mismatched passwords
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    fixture.detectChanges();

    expect(messageSpy).toHaveBeenCalledWith(testForm);
    expect(component.getErrorMessage(component.visibleErrors[0])).toBe('Custom error message');
  });

  it('should emit errorClick when error is clicked', () => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error',
        affectedFields: ['password', 'confirmPassword']
      }
    };

    component.errors = config;
    component.showWhen = 'always';

    // Set mismatched passwords
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    fixture.detectChanges();

    const errorClickSpy = jasmine.createSpy('errorClick');
    component.errorClick.subscribe(errorClickSpy);

    component.onErrorClick(component.visibleErrors[0]);

    expect(errorClickSpy).toHaveBeenCalledWith(component.visibleErrors[0]);
  });

  it('should respect maxErrors limit', () => {
    // Create form with multiple errors
    const multiErrorForm = formBuilder.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required]
    }, {
      validators: [multiErrorValidator]
    });

    const config: FormValidationConfig = {
      error1: { message: 'Error 1', severity: 'error' },
      error2: { message: 'Error 2', severity: 'error' },
      error3: { message: 'Error 3', severity: 'error' }
    };

    component.form = multiErrorForm;
    component.errors = config;
    component.showWhen = 'always';
    component.maxErrors = 2;

    multiErrorForm.markAsTouched();
    fixture.detectChanges();

    expect(component.visibleErrors.length).toBeLessThanOrEqual(2);
  });

  it('should update errors when form value changes', (done) => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'always';
    fixture.detectChanges();

    // Initially set mismatched passwords
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    setTimeout(() => {
      expect(component.visibleErrors.length).toBe(1);

      // Fix the mismatch
      testForm.get('confirmPassword')?.setValue('password123');

      setTimeout(() => {
        expect(component.visibleErrors.length).toBe(0);
        done();
      }, 100);
    }, 100);
  });

  it('should support different severity levels', () => {
    const form = formBuilder.group({}, {
      validators: [multiSeverityValidator]
    });

    const config: FormValidationConfig = {
      error1: { message: 'Error', severity: 'error' },
      warning1: { message: 'Warning', severity: 'warning' },
      info1: { message: 'Info', severity: 'info' }
    };

    component.form = form;
    component.errors = config;
    component.showWhen = 'always';

    fixture.detectChanges();

    expect(component.visibleErrors.find(e => e.key === 'error1')?.severity).toBe('error');
    expect(component.visibleErrors.find(e => e.key === 'warning1')?.severity).toBe('warning');
    expect(component.visibleErrors.find(e => e.key === 'info1')?.severity).toBe('info');
  });

  it('should display correct severity icons', () => {
    expect(component.getSeverityIcon('error')).toBe('error');
    expect(component.getSeverityIcon('warning')).toBe('warning');
    expect(component.getSeverityIcon('info')).toBe('info');
    expect(component.getSeverityIcon(undefined)).toBe('error'); // default
  });

  it('should work with summary display mode', () => {
    component.displayMode = 'summary';
    expect(component.showSummary).toBe(true);
    expect(component.showInline).toBe(false);
    expect(component.showFloating).toBe(false);
  });

  it('should work with inline display mode', () => {
    component.displayMode = 'inline';
    expect(component.showSummary).toBe(false);
    expect(component.showInline).toBe(true);
    expect(component.showFloating).toBe(false);
  });

  it('should work with floating display mode', () => {
    component.displayMode = 'floating';
    expect(component.showSummary).toBe(false);
    expect(component.showInline).toBe(false);
    expect(component.showFloating).toBe(true);
  });

  it('should work with all display mode', () => {
    component.displayMode = 'all';
    expect(component.showSummary).toBe(true);
    expect(component.showInline).toBe(true);
    expect(component.showFloating).toBe(true);
  });

  it('should toggle collapse state', () => {
    component.collapsed = false;
    component.toggleCollapse();
    expect(component.collapsed).toBe(true);
    component.toggleCollapse();
    expect(component.collapsed).toBe(false);
  });

  it('should emit errorChange when visible errors update', (done) => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'always';

    const errorChangeSpy = jasmine.createSpy('errorChange');
    component.errorChange.subscribe(errorChangeSpy);

    fixture.detectChanges();

    // Set mismatched passwords
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    setTimeout(() => {
      expect(errorChangeSpy).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should handle showWhen "dirty" correctly', () => {
    component.showWhen = 'dirty';

    // Form is not dirty initially
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');
    fixture.detectChanges();

    expect(component.visibleErrors.length).toBe(0);

    // Mark as dirty
    testForm.markAsDirty();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.visibleErrors.length).toBeGreaterThan(0);
    }, 100);
  });

  it('should handle showWhen "always" correctly', () => {
    const config: FormValidationConfig = {
      passwordMismatch: {
        message: 'Passwords do not match',
        severity: 'error'
      }
    };

    component.errors = config;
    component.showWhen = 'always';

    // Set mismatched passwords without touching
    testForm.get('password')?.setValue('password123');
    testForm.get('confirmPassword')?.setValue('different');

    fixture.detectChanges();

    expect(component.visibleErrors.length).toBe(1);
  });

  it('should cleanup subscriptions on destroy', () => {
    const destroySpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');

    fixture.destroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

// Helper validators for tests
function passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

function multiErrorValidator(): ValidationErrors {
  return {
    error1: true,
    error2: true,
    error3: true
  };
}

function multiSeverityValidator(): ValidationErrors {
  return {
    error1: true,
    warning1: true,
    info1: true
  };
}
