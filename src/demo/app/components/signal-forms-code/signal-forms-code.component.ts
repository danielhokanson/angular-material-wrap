import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

type CodeExample = 'basic' | 'validation' | 'computed' | 'controls' | 'reset';

/**
 * Signal Forms Code Component
 * Shows code examples for using Angular Signal Forms with AMW components
 */
@Component({
    selector: 'amw-demo-signal-forms-code',
    standalone: true,
    imports: [
        CommonModule,
        AmwCardComponent,
        AmwIconComponent,
        AmwButtonComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signal-forms-code.component.html',
    styleUrl: './signal-forms-code.component.scss'
})
export class SignalFormsCodeComponent {
    selectedExample = signal<CodeExample>('basic');

    readonly codeExamples: Record<CodeExample, { title: string; description: string; code: string }> = {
        basic: {
            title: 'Basic Signal Form',
            description: 'Create a simple form using form() and bind with [field]',
            code: `import { Component, computed } from '@angular/core';
import { form, Field } from '@angular/forms/signals';
import { Validators } from '@angular/forms';
import { AmwInputComponent } from 'angular-material-wrap';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AmwInputComponent],
  template: \`
    <amw-input
      [field]="userForm.name"
      label="Name"
      placeholder="Enter your name">
    </amw-input>

    <amw-input
      [field]="userForm.email"
      type="email"
      label="Email"
      placeholder="Enter email">
    </amw-input>

    <p>Form Valid: {{ isValid() }}</p>
  \`
})
export class ExampleComponent {
  // Create form using form() factory
  userForm = form({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  // Computed signal reacts to form changes
  isValid = computed(() => this.userForm.valid());
}`
        },
        validation: {
            title: 'Form Validation',
            description: 'Add validators and check form/field validity',
            code: `import { form, Field } from '@angular/forms/signals';
import { Validators } from '@angular/forms';

// Create form with validators
const registrationForm = form({
  username: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
  ]],
  confirmPassword: ['', Validators.required],
  age: [null, [Validators.required, Validators.min(18)]]
});

// Check validity (reactive signals)
const isFormValid = computed(() => registrationForm.valid());
const usernameErrors = computed(() =>
  registrationForm.username.errors()
);

// Access validation state
if (registrationForm.password.valid()) {
  console.log('Password is valid');
}

// Check specific errors
if (registrationForm.age.errors()?.min) {
  console.log('Must be 18 or older');
}`
        },
        computed: {
            title: 'Computed Values',
            description: 'Create reactive computed signals from form state',
            code: `import { Component, computed, effect } from '@angular/core';
import { form } from '@angular/forms/signals';

@Component({ ... })
export class FormComponent {
  orderForm = form({
    quantity: [1],
    pricePerUnit: [10],
    discount: [0],
    taxRate: [0.08]
  });

  // Computed signals automatically update
  subtotal = computed(() => {
    const values = this.orderForm.value();
    return values.quantity * values.pricePerUnit;
  });

  discountAmount = computed(() => {
    return this.subtotal() * (this.orderForm.value().discount / 100);
  });

  tax = computed(() => {
    const afterDiscount = this.subtotal() - this.discountAmount();
    return afterDiscount * this.orderForm.value().taxRate;
  });

  total = computed(() => {
    return this.subtotal() - this.discountAmount() + this.tax();
  });

  // Effect runs on any form change
  constructor() {
    effect(() => {
      console.log('Order total:', this.total());
    });
  }
}`
        },
        controls: {
            title: 'All Supported Controls',
            description: 'AMW components that support [field] binding',
            code: `// All these AMW controls support [field] binding:

<amw-input [field]="form.text" />
<amw-textarea [field]="form.description" />
<amw-select [field]="form.country" [options]="countries" />
<amw-checkbox [field]="form.agree" />
<amw-radio-group [field]="form.preference" [options]="opts" />
<amw-slider [field]="form.rating" />
<amw-range-slider [field]="form.priceRange" />
<amw-toggle [field]="form.enabled" />
<amw-switch [field]="form.darkMode" />
<amw-datepicker [field]="form.birthDate" />
<amw-autocomplete [field]="form.city" [options]="cities" />
<amw-button-toggle-group [field]="form.size" />
<amw-radio [field]="form.option" />

// Note: [field] is MUTUALLY EXCLUSIVE with:
// - [(ngModel)] / (ngModelChange)
// - [formControl] / formControlName

// Do NOT mix binding approaches on the same control!`
        },
        reset: {
            title: 'Reset & Patch Values',
            description: 'Reset or programmatically update form values',
            code: `import { form } from '@angular/forms/signals';

const profileForm = form({
  firstName: [''],
  lastName: [''],
  email: [''],
  bio: ['']
});

// Reset to initial values
profileForm.reset();

// Reset with specific values
profileForm.reset({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  bio: ''
});

// Patch specific fields (keeps other values)
profileForm.patchValue({
  email: 'newemail@example.com'
});

// Set entire form value
profileForm.setValue({
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  bio: 'Hello world!'
});

// Access current values
const currentValues = profileForm.value();
const firstName = profileForm.firstName.value();`
        }
    };

    selectExample(example: CodeExample): void {
        this.selectedExample.set(example);
    }

    copyCode(): void {
        const code = this.codeExamples[this.selectedExample()].code;
        navigator.clipboard.writeText(code);
    }
}
