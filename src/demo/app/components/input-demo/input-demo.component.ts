import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { InputType } from '../../../../library/src/controls/components/amw-input/interfaces/input-type.type';
import { InputAppearance } from '../../../../library/src/controls/components/amw-input/interfaces/input-appearance.type';
import { InputSize } from '../../../../library/src/controls/components/amw-input/interfaces/input-size.type';

@Component({
    selector: 'amw-demo-input',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatRippleModule,
        MatOptionModule,
        MatDividerModule,
        MatExpansionModule,
        MatTabsModule,
        MatSnackBarModule,
        AmwInputComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-demo.component.html',
    styleUrl: './input-demo.component.scss'
})
export class InputDemoComponent {
    // Input variations for display
    inputVariations = {
        types: [
            { type: 'text' as InputType, label: 'Text' },
            { type: 'email' as InputType, label: 'Email' },
            { type: 'password' as InputType, label: 'Password' },
            { type: 'number' as InputType, label: 'Number' },
            { type: 'tel' as InputType, label: 'Telephone' },
            { type: 'url' as InputType, label: 'URL' },
            { type: 'search' as InputType, label: 'Search' }
        ],
        appearances: [
            { appearance: 'outline' as InputAppearance, label: 'Outline' },
            { appearance: 'fill' as InputAppearance, label: 'Fill' },
            { appearance: 'outline' as InputAppearance, label: 'Outline' }
        ],
        sizes: [
            { size: 'small' as InputSize, label: 'Small' },
            { size: 'medium' as InputSize, label: 'Medium' },
            { size: 'large' as InputSize, label: 'Large' }
        ],
        states: [
            { disabled: false, required: false, readonly: false, label: 'Normal' },
            { disabled: true, required: false, readonly: false, label: 'Disabled' },
            { disabled: false, required: true, readonly: false, label: 'Required' },
            { disabled: false, required: false, readonly: true, label: 'Readonly' }
        ]
    };
}