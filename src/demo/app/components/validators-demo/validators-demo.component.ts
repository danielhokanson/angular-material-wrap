import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AmwValidators } from '../../../../library/src/validation/validators/amw-validators';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-validators-demo',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwDemoDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <amw-demo-doc
            title="Custom Validators"
            description="A comprehensive set of custom validators for Angular Reactive Forms.">

            <h3>Password Match Example</h3>
            <p>Uses <code>AmwValidators.passwordsMatch()</code> to validate password confirmation.</p>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Password Form</h4>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="passwordForm" class="demo-form">
                        <amw-input
                            label="Password"
                            type="password"
                            formControlName="password"
                            />

                        <amw-input
                            label="Confirm Password"
                            type="password"
                            formControlName="confirmPassword"
                            />

                        @if (passwordForm.hasError('mismatch')) {
                            <p class="form-error">Passwords do not match</p>
                        }

                        <amw-button
                            appearance="filled"
                            [disabled]="passwordForm.invalid"
                            (buttonClick)="onPasswordSubmit()">
                            Submit
                        </amw-button>
                    </form>
                </mat-card-content>
            </amw-card>

            <h3>URL Validation Example</h3>
            <p>Uses <code>AmwValidators.validUrl()</code> and <code>AmwValidators.validUrlStrict()</code>.</p>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>URL Form</h4>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="urlForm" class="demo-form">
                        <amw-input
                            label="Website URL (flexible)"
                            formControlName="flexibleUrl"
                            hint="Accepts URLs with or without protocol"
                            />
                        @if (urlForm.get('flexibleUrl')?.hasError('invalidUrl')) {
                            <p class="form-error">Please enter a valid URL</p>
                        }

                        <amw-input
                            label="API Endpoint (strict)"
                            formControlName="strictUrl"
                            hint="Must include http:// or https://"
                            />
                        @if (urlForm.get('strictUrl')?.hasError('invalidUrl')) {
                            <p class="form-error">Must be a valid URL with protocol (http/https)</p>
                        }
                    </form>
                </mat-card-content>
            </amw-card>

            <h3>Number Validation Example</h3>
            <p>Uses <code>AmwValidators.positiveNumber()</code> and <code>AmwValidators.nonNegativeNumber()</code>.</p>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Number Form</h4>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="numberForm" class="demo-form">
                        <amw-input
                            label="Quantity (positive only)"
                            type="number"
                            formControlName="positiveNumber"
                            />
                        @if (numberForm.get('positiveNumber')?.hasError('notPositive')) {
                            <p class="form-error">Must be a positive number (greater than 0)</p>
                        }

                        <amw-input
                            label="Balance (non-negative)"
                            type="number"
                            formControlName="nonNegativeNumber"
                            />
                        @if (numberForm.get('nonNegativeNumber')?.hasError('negative')) {
                            <p class="form-error">Must be zero or greater</p>
                        }
                    </form>
                </mat-card-content>
            </amw-card>

            <h3>Array Validation Example</h3>
            <p>Uses <code>AmwValidators.arrayMinLength()</code> and <code>AmwValidators.arrayMaxLength()</code>.</p>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Tags Selection</h4>
                </mat-card-header>
                <mat-card-content>
                    <div class="demo-tags">
                        <p>Select 2-5 tags:</p>
                        <div class="tag-list">
                            @for (tag of availableTags; track tag) {
                                <button
                                    type="button"
                                    class="tag-chip"
                                    [class.selected]="selectedTags().includes(tag)"
                                    (click)="toggleTag(tag)">
                                    {{ tag }}
                                </button>
                            }
                        </div>
                        @if (arrayForm.get('tags')?.hasError('arrayMinLength')) {
                            <p class="form-error">Select at least 2 tags</p>
                        }
                        @if (arrayForm.get('tags')?.hasError('arrayMaxLength')) {
                            <p class="form-error">Maximum 5 tags allowed</p>
                        }
                        <p class="tag-count">Selected: {{ selectedTags().length }} tags</p>
                    </div>
                </mat-card-content>
            </amw-card>

            <h3>Date Validation Example</h3>
            <p>Uses <code>AmwValidators.futureDate()</code>, <code>AmwValidators.pastOrPresentDate()</code>, and <code>AmwValidators.dateRange()</code>.</p>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Event Date Form</h4>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="dateForm" class="demo-form">
                        <amw-input
                            label="Birth Date (past or present)"
                            type="date"
                            formControlName="birthDate"
                            />
                        @if (dateForm.get('birthDate')?.hasError('futureDate')) {
                            <p class="form-error">Birth date cannot be in the future</p>
                        }

                        <amw-input
                            label="Event Start Date (future)"
                            type="date"
                            formControlName="startDate"
                            />
                        @if (dateForm.get('startDate')?.hasError('notFutureDate')) {
                            <p class="form-error">Event must be in the future</p>
                        }

                        <amw-input
                            label="Event End Date"
                            type="date"
                            formControlName="endDate"
                            />
                        @if (dateForm.hasError('dateRange')) {
                            <p class="form-error">End date must be after start date</p>
                        }
                    </form>
                </mat-card-content>
            </amw-card>

            <h3>Other Validators</h3>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Additional Validators</h4>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="otherForm" class="demo-form">
                        <amw-input
                            label="Username (alphanumeric)"
                            formControlName="alphanumeric"
                            hint="Letters and numbers only"
                            />
                        @if (otherForm.get('alphanumeric')?.hasError('notAlphanumeric')) {
                            <p class="form-error">Only letters and numbers allowed</p>
                        }

                        <amw-input
                            label="Display Name (alphanumeric with spaces)"
                            formControlName="alphanumericSpaces"
                            hint="Letters, numbers, and spaces allowed"
                            />
                        @if (otherForm.get('alphanumericSpaces')?.hasError('notAlphanumericWithSpaces')) {
                            <p class="form-error">Only letters, numbers, and spaces allowed</p>
                        }

                        <amw-input
                            label="Phone Number"
                            formControlName="phone"
                            hint="US format: (xxx) xxx-xxxx"
                            />
                        @if (otherForm.get('phone')?.hasError('invalidPhoneNumber')) {
                            <p class="form-error">Please enter a valid phone number</p>
                        }

                        <amw-input
                            label="Unique Username"
                            formControlName="uniqueValue"
                            hint="Cannot be: admin, root, system"
                            />
                        @if (otherForm.get('uniqueValue')?.hasError('notUnique')) {
                            <p class="form-error">This value is already taken</p>
                        }
                    </form>
                </mat-card-content>
            </amw-card>

            <h3>Code Examples</h3>
            <pre><code>import {{ '{' }} AmwValidators {{ '}' }} from '&#64;anthropic/angular-material-wrap';

// Password match validation
this.form = this.fb.group({{ '{' }}
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', Validators.required]
{{ '}' }}, {{ '{' }}
  validators: AmwValidators.passwordsMatch('password', 'confirmPassword')
{{ '}' }});

// URL validation
urlControl: ['', AmwValidators.validUrl()],
strictUrlControl: ['', AmwValidators.validUrlStrict()],

// Number validation
quantity: ['', [Validators.required, AmwValidators.positiveNumber()]],
balance: ['', AmwValidators.nonNegativeNumber()],

// Array validation
tags: [[], [AmwValidators.arrayMinLength(2), AmwValidators.arrayMaxLength(5)]],

// Date validation
birthDate: ['', AmwValidators.pastOrPresentDate()],
eventDate: ['', AmwValidators.futureDate()],
{{ '{' }} validators: AmwValidators.dateRange('startDate', 'endDate') {{ '}' }}

// Text validation
username: ['', AmwValidators.alphanumeric()],
displayName: ['', AmwValidators.alphanumericWithSpaces()],
phone: ['', AmwValidators.phoneNumber()],

// Uniqueness validation
username: ['', AmwValidators.unique(['admin', 'root', 'system'])],

// Conditional required
{{ '{' }} validators: AmwValidators.requiredWhen('country', v => v === 'USA', 'state') {{ '}' }}</code></pre>

            <h3>Available Validators</h3>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Validator</th>
                        <th>Description</th>
                        <th>Error Key</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>fieldsMatch(field1, field2)</code></td>
                        <td>Validates two fields have the same value</td>
                        <td>mismatch</td>
                    </tr>
                    <tr>
                        <td><code>passwordsMatch()</code></td>
                        <td>Shorthand for password/confirmPassword match</td>
                        <td>mismatch</td>
                    </tr>
                    <tr>
                        <td><code>validUrl()</code></td>
                        <td>Validates URL format (flexible)</td>
                        <td>invalidUrl</td>
                    </tr>
                    <tr>
                        <td><code>validUrlStrict()</code></td>
                        <td>Validates URL with required protocol</td>
                        <td>invalidUrl</td>
                    </tr>
                    <tr>
                        <td><code>positiveNumber()</code></td>
                        <td>Value must be greater than 0</td>
                        <td>notPositive</td>
                    </tr>
                    <tr>
                        <td><code>nonNegativeNumber()</code></td>
                        <td>Value must be >= 0</td>
                        <td>negative</td>
                    </tr>
                    <tr>
                        <td><code>arrayMinLength(min)</code></td>
                        <td>Array must have at least min items</td>
                        <td>arrayMinLength</td>
                    </tr>
                    <tr>
                        <td><code>arrayMaxLength(max)</code></td>
                        <td>Array must have at most max items</td>
                        <td>arrayMaxLength</td>
                    </tr>
                    <tr>
                        <td><code>requiredWhen(field, condition)</code></td>
                        <td>Field required when condition is true</td>
                        <td>required</td>
                    </tr>
                    <tr>
                        <td><code>alphanumeric()</code></td>
                        <td>Only letters and numbers</td>
                        <td>notAlphanumeric</td>
                    </tr>
                    <tr>
                        <td><code>alphanumericWithSpaces()</code></td>
                        <td>Letters, numbers, and spaces</td>
                        <td>notAlphanumericWithSpaces</td>
                    </tr>
                    <tr>
                        <td><code>futureDate()</code></td>
                        <td>Date must be in the future</td>
                        <td>notFutureDate</td>
                    </tr>
                    <tr>
                        <td><code>pastOrPresentDate()</code></td>
                        <td>Date must not be in the future</td>
                        <td>futureDate</td>
                    </tr>
                    <tr>
                        <td><code>dateRange(start, end)</code></td>
                        <td>End date must be after start date</td>
                        <td>dateRange</td>
                    </tr>
                    <tr>
                        <td><code>phoneNumber()</code></td>
                        <td>Valid phone number format</td>
                        <td>invalidPhoneNumber</td>
                    </tr>
                    <tr>
                        <td><code>requiredTrue()</code></td>
                        <td>Checkbox must be checked</td>
                        <td>requiredTrue</td>
                    </tr>
                    <tr>
                        <td><code>unique(existingValues)</code></td>
                        <td>Value must not exist in array</td>
                        <td>notUnique</td>
                    </tr>
                </tbody>
            </table>

        </amw-demo-doc>
    `,
    styles: [`
        .demo-card {
            margin-bottom: 24px;
        }

        .demo-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 400px;
        }

        .form-error {
            color: var(--md-sys-color-error, #ba1a1a);
            font-size: 12px;
            margin: -8px 0 8px 0;
        }

        .demo-tags {
            padding: 16px;
        }

        .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .tag-chip {
            padding: 6px 12px;
            border-radius: 16px;
            border: 1px solid var(--md-sys-color-outline, #79747e);
            background: transparent;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: var(--md-sys-color-surface-container-high, #ece6f0);
            }

            &.selected {
                background: var(--md-sys-color-primary, #6750a4);
                color: var(--md-sys-color-on-primary, #ffffff);
                border-color: var(--md-sys-color-primary, #6750a4);
            }
        }

        .tag-count {
            font-size: 14px;
            color: var(--md-sys-color-on-surface-variant, #49454f);
        }

        .api-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;

            th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid var(--md-sys-color-outline-variant, #cac4d0);
            }

            th {
                background: var(--md-sys-color-surface-container, #f3edf7);
                font-weight: 500;
            }

            code {
                background: var(--md-sys-color-surface-container-high, #ece6f0);
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 13px;
            }
        }

        pre {
            background: var(--md-sys-color-surface-container, #f3edf7);
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;

            code {
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 13px;
            }
        }
    `]
})
export class ValidatorsDemoComponent {
    availableTags = ['Angular', 'TypeScript', 'JavaScript', 'React', 'Vue', 'Node.js', 'CSS', 'HTML'];
    selectedTags = signal<string[]>([]);

    passwordForm: FormGroup;
    urlForm: FormGroup;
    numberForm: FormGroup;
    arrayForm: FormGroup;
    dateForm: FormGroup;
    otherForm: FormGroup;

    constructor(private fb: FormBuilder) {
        // Password match form
        this.passwordForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required]
        }, {
            validators: AmwValidators.passwordsMatch('password', 'confirmPassword')
        });

        // URL validation form
        this.urlForm = this.fb.group({
            flexibleUrl: ['', AmwValidators.validUrl()],
            strictUrl: ['', AmwValidators.validUrlStrict()]
        });

        // Number validation form
        this.numberForm = this.fb.group({
            positiveNumber: ['', [Validators.required, AmwValidators.positiveNumber()]],
            nonNegativeNumber: ['', AmwValidators.nonNegativeNumber()]
        });

        // Array validation form
        this.arrayForm = this.fb.group({
            tags: [[], [AmwValidators.arrayMinLength(2), AmwValidators.arrayMaxLength(5)]]
        });

        // Date validation form
        this.dateForm = this.fb.group({
            birthDate: ['', AmwValidators.pastOrPresentDate()],
            startDate: ['', AmwValidators.futureDate()],
            endDate: ['']
        }, {
            validators: AmwValidators.dateRange('startDate', 'endDate')
        });

        // Other validators form
        this.otherForm = this.fb.group({
            alphanumeric: ['', AmwValidators.alphanumeric()],
            alphanumericSpaces: ['', AmwValidators.alphanumericWithSpaces()],
            phone: ['', AmwValidators.phoneNumber()],
            uniqueValue: ['', AmwValidators.unique(['admin', 'root', 'system'], false)]
        });
    }

    toggleTag(tag: string): void {
        const current = this.selectedTags();
        if (current.includes(tag)) {
            this.selectedTags.set(current.filter(t => t !== tag));
        } else {
            this.selectedTags.set([...current, tag]);
        }
        this.arrayForm.get('tags')?.setValue(this.selectedTags());
        this.arrayForm.get('tags')?.markAsTouched();
    }

    onPasswordSubmit(): void {
        if (this.passwordForm.valid) {
            alert('Password form submitted successfully!');
            this.passwordForm.reset();
        }
    }
}
