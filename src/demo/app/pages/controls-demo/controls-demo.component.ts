import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { DemoBaseComponent, DemoProperty } from '../../components/demo-base/demo-base.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';

@Component({
    selector: 'amw-demo-controls',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DemoBaseComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwSelectComponent
    ],
    templateUrl: './controls-demo.component.html',
    styleUrl: './controls-demo.component.scss'
})
export class ControlsDemoComponent implements OnInit {
    buttonProperties: DemoProperty[] = [
        {
            name: 'variant',
            type: 'select',
            value: 'primary',
            options: [
                { value: 'primary', label: 'Primary' },
                { value: 'accent', label: 'Accent' },
                { value: 'warn', label: 'Warn' },
                { value: 'basic', label: 'Basic' },
                { value: 'raised', label: 'Raised' },
                { value: 'stroked', label: 'Stroked' },
                { value: 'flat', label: 'Flat' },
                { value: 'icon', label: 'Icon' },
                { value: 'fab', label: 'FAB' },
                { value: 'mini-fab', label: 'Mini FAB' }
            ],
            description: 'Button visual style variant'
        },
        {
            name: 'color',
            type: 'select',
            value: 'primary',
            options: [
                { value: 'primary', label: 'Primary' },
                { value: 'accent', label: 'Accent' },
                { value: 'warn', label: 'Warn' },
                { value: 'basic', label: 'Basic' }
            ],
            description: 'Button color theme'
        },
        {
            name: 'size',
            type: 'select',
            value: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            description: 'Button size'
        },
        {
            name: 'disabled',
            type: 'boolean',
            value: false,
            description: 'Whether the button is disabled'
        },
        {
            name: 'loading',
            type: 'boolean',
            value: false,
            description: 'Whether the button is in loading state'
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            value: false,
            description: 'Whether the button takes full width'
        },
        {
            name: 'autofocus',
            type: 'boolean',
            value: false,
            description: 'Whether the button should be focused on page load'
        },
        {
            name: 'icon',
            type: 'string',
            value: 'home',
            description: 'Material icon name to display'
        },
        {
            name: 'iconPosition',
            type: 'select',
            value: 'left',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
            ],
            description: 'Position of the icon relative to text'
        },
        {
            name: 'ripple',
            type: 'boolean',
            value: true,
            description: 'Whether to show ripple effect on click'
        },
        {
            name: 'disableRipple',
            type: 'boolean',
            value: false,
            description: 'Whether to disable ripple effect'
        },
        {
            name: 'ariaLabel',
            type: 'string',
            value: '',
            description: 'Accessibility label for screen readers'
        },
        {
            name: 'tabIndex',
            type: 'number',
            value: 0,
            description: 'Tab order for keyboard navigation'
        }
    ];

    inputProperties: DemoProperty[] = [
        {
            name: 'type',
            type: 'select',
            value: 'text',
            options: [
                { value: 'text', label: 'Text' },
                { value: 'email', label: 'Email' },
                { value: 'password', label: 'Password' },
                { value: 'number', label: 'Number' },
                { value: 'tel', label: 'Telephone' },
                { value: 'url', label: 'URL' },
                { value: 'search', label: 'Search' },
                { value: 'date', label: 'Date' },
                { value: 'time', label: 'Time' }
            ],
            description: 'Input type'
        },
        {
            name: 'appearance',
            type: 'select',
            value: 'outline',
            options: [
                { value: 'outline', label: 'Outline' },
                { value: 'fill', label: 'Fill' },
                { value: 'standard', label: 'Standard' }
            ],
            description: 'Input appearance style'
        },
        {
            name: 'size',
            type: 'select',
            value: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            description: 'Input size'
        },
        {
            name: 'placeholder',
            type: 'string',
            value: 'Enter text here',
            description: 'Placeholder text'
        },
        {
            name: 'label',
            type: 'string',
            value: 'Input Label',
            description: 'Input label'
        },
        {
            name: 'hint',
            type: 'string',
            value: 'This is a hint',
            description: 'Hint text'
        },
        {
            name: 'disabled',
            type: 'boolean',
            value: false,
            description: 'Whether the input is disabled'
        },
        {
            name: 'required',
            type: 'boolean',
            value: false,
            description: 'Whether the input is required'
        },
        {
            name: 'readonly',
            type: 'boolean',
            value: false,
            description: 'Whether the input is readonly'
        },
        {
            name: 'clearable',
            type: 'boolean',
            value: false,
            description: 'Whether to show clear button'
        },
        {
            name: 'showPasswordToggle',
            type: 'boolean',
            value: false,
            description: 'Whether to show password toggle (for password type)'
        },
        {
            name: 'showCharacterCount',
            type: 'boolean',
            value: false,
            description: 'Whether to show character count'
        },
        {
            name: 'maxlength',
            type: 'number',
            value: 100,
            description: 'Maximum character length'
        },
        {
            name: 'startIcon',
            type: 'string',
            value: 'person',
            description: 'Start icon name'
        },
        {
            name: 'endIcon',
            type: 'string',
            value: '',
            description: 'End icon name'
        }
    ];

    selectProperties: DemoProperty[] = [
        {
            name: 'appearance',
            type: 'select',
            value: 'outline',
            options: [
                { value: 'outline', label: 'Outline' },
                { value: 'fill', label: 'Fill' },
                { value: 'standard', label: 'Standard' }
            ],
            description: 'Select appearance style'
        },
        {
            name: 'size',
            type: 'select',
            value: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            description: 'Select size'
        },
        {
            name: 'placeholder',
            type: 'string',
            value: 'Choose an option',
            description: 'Placeholder text'
        },
        {
            name: 'label',
            type: 'string',
            value: 'Select Label',
            description: 'Select label'
        },
        {
            name: 'hint',
            type: 'string',
            value: 'This is a hint',
            description: 'Hint text'
        },
        {
            name: 'multiple',
            type: 'boolean',
            value: false,
            description: 'Whether multiple selection is allowed'
        },
        {
            name: 'disabled',
            type: 'boolean',
            value: false,
            description: 'Whether the select is disabled'
        },
        {
            name: 'required',
            type: 'boolean',
            value: false,
            description: 'Whether the select is required'
        },
        {
            name: 'searchable',
            type: 'boolean',
            value: false,
            description: 'Whether options can be searched'
        },
        {
            name: 'clearable',
            type: 'boolean',
            value: false,
            description: 'Whether selection can be cleared'
        },
        {
            name: 'loading',
            type: 'boolean',
            value: false,
            description: 'Whether select is in loading state'
        },
        {
            name: 'showSearchBox',
            type: 'boolean',
            value: false,
            description: 'Whether to show search input box'
        },
        {
            name: 'showClearButton',
            type: 'boolean',
            value: false,
            description: 'Whether to show clear button'
        }
    ];

    // Direct property access for template binding
    get buttonVariant() { return this.getPropertyValue('variant'); }
    get buttonColor() { return this.getPropertyValue('color'); }
    get buttonSize() { return this.getPropertyValue('size'); }
    get buttonDisabled() { return this.getPropertyValue('disabled'); }
    get buttonLoading() { return this.getPropertyValue('loading'); }
    get buttonFullWidth() { return this.getPropertyValue('fullWidth'); }
    get buttonAutofocus() { return this.getPropertyValue('autofocus'); }
    get buttonIcon() { return this.getPropertyValue('icon'); }
    get buttonIconPosition() { return this.getPropertyValue('iconPosition'); }
    get buttonRipple() { return this.getPropertyValue('ripple'); }
    get buttonDisableRipple() { return this.getPropertyValue('disableRipple'); }
    get buttonAriaLabel() { return this.getPropertyValue('ariaLabel'); }
    get buttonTabIndex() { return this.getPropertyValue('tabIndex'); }

    // Input property getters
    get inputType() { return this.getPropertyValue('type'); }
    get inputAppearance() { return this.getPropertyValue('appearance'); }
    get inputSize() { return this.getPropertyValue('size'); }
    get inputPlaceholder() { return this.getPropertyValue('placeholder'); }
    get inputLabel() { return this.getPropertyValue('label'); }
    get inputHint() { return this.getPropertyValue('hint'); }
    get inputDisabled() { return this.getPropertyValue('disabled'); }
    get inputRequired() { return this.getPropertyValue('required'); }
    get inputReadonly() { return this.getPropertyValue('readonly'); }
    get inputClearable() { return this.getPropertyValue('clearable'); }
    get inputShowPasswordToggle() { return this.getPropertyValue('showPasswordToggle'); }
    get inputShowCharacterCount() { return this.getPropertyValue('showCharacterCount'); }
    get inputMaxlength() { return this.getPropertyValue('maxlength'); }
    get inputStartIcon() { return this.getPropertyValue('startIcon'); }
    get inputEndIcon() { return this.getPropertyValue('endIcon'); }

    // Select property getters
    get selectAppearance() { return this.getPropertyValue('appearance'); }
    get selectSize() { return this.getPropertyValue('size'); }
    get selectPlaceholder() { return this.getPropertyValue('placeholder'); }
    get selectLabel() { return this.getPropertyValue('label'); }
    get selectHint() { return this.getPropertyValue('hint'); }
    get selectMultiple() { return this.getPropertyValue('multiple'); }
    get selectDisabled() { return this.getPropertyValue('disabled'); }
    get selectRequired() { return this.getPropertyValue('required'); }
    get selectSearchable() { return this.getPropertyValue('searchable'); }
    get selectClearable() { return this.getPropertyValue('clearable'); }
    get selectLoading() { return this.getPropertyValue('loading'); }
    get selectShowSearchBox() { return this.getPropertyValue('showSearchBox'); }
    get selectShowClearButton() { return this.getPropertyValue('showClearButton'); }

    // Sample options for select demo
    get selectOptions() {
        return [
            { value: 'option1', label: 'Option 1', description: 'First option' },
            { value: 'option2', label: 'Option 2', description: 'Second option' },
            { value: 'option3', label: 'Option 3', description: 'Third option' },
            { value: 'option4', label: 'Option 4', description: 'Fourth option' },
            { value: 'option5', label: 'Option 5', description: 'Fifth option' }
        ];
    }

    // Form mode
    formGroup = new FormGroup({
        buttonValue: new FormControl('')
    });

    // ngModel mode
    ngModelValue = '';

    private propertyValues: { [key: string]: any } = {};

    ngOnInit(): void {
        this.initializeProperties();
    }

    private initializeProperties(): void {
        this.buttonProperties.forEach(prop => {
            this.propertyValues[prop.name] = prop.value;
        });
    }

    getPropertyValue(propertyName: string): any {
        return this.propertyValues[propertyName];
    }

    onPropertyChange(event: { property: string; value: any }): void {
        this.propertyValues[event.property] = event.value;
        console.log('Property changed:', event);
    }

    onFormModeChange(isFormMode: boolean): void {
        console.log('Form mode changed:', isFormMode);
    }

    onButtonClick(): void {
        console.log('Button clicked!');
    }
}
