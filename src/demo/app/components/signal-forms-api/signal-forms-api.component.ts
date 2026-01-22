import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../base/base-api.component';

interface ApiItem {
    name: string;
    type: string;
    description: string;
}

interface SupportedControl {
    name: string;
    selector: string;
    notes?: string;
}

/**
 * Signal Forms API Component
 * Documents the Signal Forms API and supported AMW components
 */
@Component({
    selector: 'amw-demo-signal-forms-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signal-forms-api.component.html',
    styleUrl: './signal-forms-api.component.scss'
})
export class SignalFormsApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'formField', type: 'FormField<T>', default: 'undefined', description: 'Signal-based form field binding for AMW controls' }
        ],
        outputs: []
    };

    interfaces: ApiInterface[] = [
        {
            name: 'FormField<T>',
            description: 'Signal-based form field interface',
            properties: [
                { name: 'value()', type: 'Signal<T>', description: 'Current field value' },
                { name: 'valid()', type: 'Signal<boolean>', description: 'Field validity state' },
                { name: 'invalid()', type: 'Signal<boolean>', description: 'Inverse of validity' },
                { name: 'errors()', type: 'Signal<ValidationErrors | null>', description: 'Validation errors' },
                { name: 'touched()', type: 'Signal<boolean>', description: 'Whether field was touched' },
                { name: 'dirty()', type: 'Signal<boolean>', description: 'Whether value has changed' }
            ]
        }
    ];

    readonly formFactoryApi: ApiItem[] = [
        {
            name: 'form(config)',
            type: 'FormGroup signal',
            description: 'Creates a signal-based form group from configuration object'
        },
        {
            name: 'form.value()',
            type: 'Signal<T>',
            description: 'Returns current form values as a signal'
        },
        {
            name: 'form.valid()',
            type: 'Signal<boolean>',
            description: 'Returns form validity state as a signal'
        },
        {
            name: 'form.invalid()',
            type: 'Signal<boolean>',
            description: 'Returns inverse of form validity as a signal'
        },
        {
            name: 'form.controls',
            type: 'Record<string, FormField>',
            description: 'Access individual field controls'
        },
        {
            name: 'form.reset()',
            type: 'void',
            description: 'Reset form to initial values'
        },
        {
            name: 'form.reset(values)',
            type: 'void',
            description: 'Reset form with specific values'
        },
        {
            name: 'form.patchValue(partial)',
            type: 'void',
            description: 'Update specific fields, keep others unchanged'
        },
        {
            name: 'form.setValue(values)',
            type: 'void',
            description: 'Set all form field values'
        }
    ];

    readonly fieldApi: ApiItem[] = [
        {
            name: 'field.value()',
            type: 'Signal<T>',
            description: 'Returns the current field value as a signal'
        },
        {
            name: 'field.valid()',
            type: 'Signal<boolean>',
            description: 'Returns field validity state as a signal'
        },
        {
            name: 'field.invalid()',
            type: 'Signal<boolean>',
            description: 'Returns inverse of field validity'
        },
        {
            name: 'field.errors()',
            type: 'Signal<ValidationErrors | null>',
            description: 'Returns current validation errors'
        },
        {
            name: 'field.touched()',
            type: 'Signal<boolean>',
            description: 'Returns whether field has been touched'
        },
        {
            name: 'field.dirty()',
            type: 'Signal<boolean>',
            description: 'Returns whether field value has changed'
        },
        {
            name: 'field.disabled()',
            type: 'Signal<boolean>',
            description: 'Returns disabled state (auto-bound to component)'
        }
    ];

    readonly supportedControls: SupportedControl[] = [
        { name: 'Input', selector: 'amw-input' },
        { name: 'Textarea', selector: 'amw-textarea' },
        { name: 'Select', selector: 'amw-select' },
        { name: 'Checkbox', selector: 'amw-checkbox' },
        { name: 'Radio', selector: 'amw-radio' },
        { name: 'Radio Group', selector: 'amw-radio-group' },
        { name: 'Slider', selector: 'amw-slider' },
        { name: 'Range Slider', selector: 'amw-range-slider', notes: 'Uses {start, end} value' },
        { name: 'Toggle', selector: 'amw-toggle' },
        { name: 'Switch', selector: 'amw-switch' },
        { name: 'Button Toggle Group', selector: 'amw-button-toggle-group' },
        { name: 'Datepicker', selector: 'amw-datepicker' },
        { name: 'Autocomplete', selector: 'amw-autocomplete' }
    ];

    readonly importStatement = `import { form, FormField } from '@angular/forms/signals';
import { Validators } from '@angular/forms';`;

    readonly usageNotes: string[] = [
        'Signal Forms are experimental and may change in future Angular releases',
        'The [formField] binding is mutually exclusive with ngModel and formControl',
        'disabled and required states are automatically derived from the FormField',
        'Use computed() signals to create reactive derived values from form state',
        'effect() can be used to perform side effects on form changes',
        'All standard Angular validators work with Signal Forms'
    ];
}
