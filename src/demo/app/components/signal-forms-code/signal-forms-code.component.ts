import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

/**
 * Signal Forms Code Component
 * Shows code examples for using Angular Signal Forms with AMW components
 */
@Component({
  selector: 'amw-demo-signal-forms-code',
  standalone: true,
  imports: [
    CommonModule,
    AmwCodeDocComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './signal-forms-code.component.html',
  styleUrl: './signal-forms-code.component.scss'
})
export class SignalFormsCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Signal Form',
      description: 'Create a simple form using form() and bind with [formField]',
      code: `import { Component, computed } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Validators } from '@angular/forms';
import { AmwInputComponent } from 'angular-material-wrap';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AmwInputComponent],
  template: \`
    <amw-input
      [formField]="userForm.name"
      label="Name"
      placeholder="Enter your name">
    </amw-input>

    <amw-input
      [formField]="userForm.email"
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
    {
      key: 'validation',
      title: 'Form Validation',
      description: 'Add validators and check form/field validity',
      code: `import { form } from '@angular/forms/signals';
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
    {
      key: 'computed',
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
    {
      key: 'controls',
      title: 'All Supported Controls',
      description: 'AMW components that support [formField] binding',
      code: `// All these AMW controls support [formField] binding:

<amw-input [formField]="form.text" />
<amw-textarea [formField]="form.description" />
<amw-select [formField]="form.country" [options]="countries" />
<amw-checkbox [formField]="form.agree" />
<amw-radio-group [formField]="form.preference" [options]="opts" />
<amw-slider [formField]="form.rating" />
<amw-range-slider [formField]="form.priceRange" />
<amw-toggle [formField]="form.enabled" />
<amw-switch [formField]="form.darkMode" />
<amw-datepicker [formField]="form.birthDate" />
<amw-autocomplete [formField]="form.city" [options]="cities" />
<amw-button-toggle-group [formField]="form.size" />
<amw-radio [formField]="form.option" />

// Note: [formField] is MUTUALLY EXCLUSIVE with:
// - [(ngModel)] / (ngModelChange)
// - [formControl] / formControlName

// Do NOT mix binding approaches on the same control!`
    },
    {
      key: 'reset',
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
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  copyCode(key: string): void {
    const example = this.examples.find(e => e.key === key);
    if (example) {
      navigator.clipboard.writeText(example.code);
    }
  }
}
