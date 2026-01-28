import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmwValidators } from '../../../../library/src/validation/validators/amw-validators';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
import { AmwTabComponent } from '../../../../library/src/components/components/amw-tabs/amw-tab.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

@Component({
    selector: 'amw-validators-demo',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwApiDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="validators-demo-page">
            <div class="validators-demo-page__header">
                <h1>Custom Validators</h1>
                <p>A comprehensive set of custom validators for Angular Reactive Forms.</p>
            </div>

            <amw-card>
                <ng-template #cardContent>
                    <amw-tabs>
                        <amw-tab label="Demo" icon="play_arrow">
                            <h3>Password Match Example</h3>
                            <p>Uses <code>AmwValidators.passwordsMatch()</code> to validate password confirmation.</p>

                            <amw-card headerTitle="Password Form" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>

                            <h3>URL Validation Example</h3>
                            <p>Uses <code>AmwValidators.validUrl()</code> and <code>AmwValidators.validUrlStrict()</code>.</p>

                            <amw-card headerTitle="URL Form" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>

                            <h3>Number Validation Example</h3>
                            <p>Uses <code>AmwValidators.positiveNumber()</code> and <code>AmwValidators.nonNegativeNumber()</code>.</p>

                            <amw-card headerTitle="Number Form" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>

                            <h3>Array Validation Example</h3>
                            <p>Uses <code>AmwValidators.arrayMinLength()</code> and <code>AmwValidators.arrayMaxLength()</code>.</p>

                            <amw-card headerTitle="Tags Selection" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>

                            <h3>Date Validation Example</h3>
                            <p>Uses <code>AmwValidators.futureDate()</code>, <code>AmwValidators.pastOrPresentDate()</code>, and <code>AmwValidators.dateRange()</code>.</p>

                            <amw-card headerTitle="Event Date Form" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>

                            <h3>Other Validators</h3>

                            <amw-card headerTitle="Additional Validators" class="demo-card">
                                <ng-template #cardContent>
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
                                </ng-template>
                            </amw-card>
                        </amw-tab>

                        <amw-tab label="Code" icon="code">
                            <div class="code-content">
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
                            </div>
                        </amw-tab>

                        <amw-tab label="API" icon="description">
                            <div class="api-content">
                                <amw-api-doc
                                    componentName="Custom Validators"
                                    [apiDocumentation]="validatorsApiDoc"
                                    description="A comprehensive set of custom validators for Angular Reactive Forms.">
                                </amw-api-doc>
                            </div>
                        </amw-tab>
                    </amw-tabs>
                </ng-template>
            </amw-card>
        </div>
    `,
    styles: [`
        .validators-demo-page {
            padding: 24px;
            max-width: 1400px;
            margin: 0 auto;

            &__header {
                margin-bottom: 24px;
                h1 { margin: 0 0 8px 0; }
                p { margin: 0; }
            }
        }

        .code-content {
            padding: 20px 0;
            h3 { margin-top: 0; }
        }

        .api-content {
            padding: 20px 0;
        }

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

    validatorsApiDoc: ApiDocumentation = {
        methods: [
            { name: 'fieldsMatch(field1: string, field2: string)', returns: 'ValidatorFn', description: 'Validates two fields have the same value. Error key: mismatch' },
            { name: 'passwordsMatch(passwordField?: string, confirmField?: string)', returns: 'ValidatorFn', description: 'Shorthand for password/confirmPassword match. Error key: mismatch' },
            { name: 'validUrl()', returns: 'ValidatorFn', description: 'Validates URL format (flexible, protocol optional). Error key: invalidUrl' },
            { name: 'validUrlStrict()', returns: 'ValidatorFn', description: 'Validates URL with required protocol (http/https). Error key: invalidUrl' },
            { name: 'positiveNumber()', returns: 'ValidatorFn', description: 'Value must be greater than 0. Error key: notPositive' },
            { name: 'nonNegativeNumber()', returns: 'ValidatorFn', description: 'Value must be >= 0. Error key: negative' },
            { name: 'arrayMinLength(min: number)', returns: 'ValidatorFn', description: 'Array must have at least min items. Error key: arrayMinLength' },
            { name: 'arrayMaxLength(max: number)', returns: 'ValidatorFn', description: 'Array must have at most max items. Error key: arrayMaxLength' },
            { name: 'requiredWhen(field: string, condition: Function, targetField: string)', returns: 'ValidatorFn', description: 'Field required when condition is true. Error key: required' },
            { name: 'alphanumeric()', returns: 'ValidatorFn', description: 'Only letters and numbers allowed. Error key: notAlphanumeric' },
            { name: 'alphanumericWithSpaces()', returns: 'ValidatorFn', description: 'Letters, numbers, and spaces allowed. Error key: notAlphanumericWithSpaces' },
            { name: 'futureDate()', returns: 'ValidatorFn', description: 'Date must be in the future. Error key: notFutureDate' },
            { name: 'pastOrPresentDate()', returns: 'ValidatorFn', description: 'Date must not be in the future. Error key: futureDate' },
            { name: 'dateRange(startField: string, endField: string)', returns: 'ValidatorFn', description: 'End date must be after start date. Error key: dateRange' },
            { name: 'phoneNumber()', returns: 'ValidatorFn', description: 'Valid phone number format. Error key: invalidPhoneNumber' },
            { name: 'requiredTrue()', returns: 'ValidatorFn', description: 'Checkbox must be checked. Error key: requiredTrue' },
            { name: 'unique(existingValues: any[], caseSensitive?: boolean)', returns: 'ValidatorFn', description: 'Value must not exist in array. Error key: notUnique' }
        ],
        usageNotes: [
            'Import AmwValidators from the library',
            'Use with Angular Reactive Forms FormControl and FormGroup',
            'Group-level validators (passwordsMatch, dateRange, requiredWhen) go in the FormGroup options',
            'Field-level validators go in the FormControl validators array',
            'All validators return standard Angular ValidatorFn'
        ]
    };

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
