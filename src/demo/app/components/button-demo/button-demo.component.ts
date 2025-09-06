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

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { ButtonVariant } from '../../../../library/src/controls/components/amw-button/interfaces/button.interface';
import { ButtonSize } from '../../../../library/src/controls/components/amw-button/interfaces/button-size.type';
import { ButtonColor } from '../../../../library/src/controls/components/amw-button/interfaces/button-color.type';

@Component({
    selector: 'amw-demo-button',
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
        AmwButtonComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-demo.component.html',
    styleUrl: './button-demo.component.scss'
})
export class ButtonDemoComponent {
    // Button variations for display
    buttonVariations = {
        sizes: [
            { size: 'small' as ButtonSize, label: 'Small' },
            { size: 'medium' as ButtonSize, label: 'Medium' },
            { size: 'large' as ButtonSize, label: 'Large' }
        ],
        variants: [
            { variant: 'primary' as ButtonVariant, label: 'Primary' },
            { variant: 'raised' as ButtonVariant, label: 'Raised' },
            { variant: 'stroked' as ButtonVariant, label: 'Stroked' },
            { variant: 'flat' as ButtonVariant, label: 'Flat' },
            { variant: 'icon' as ButtonVariant, label: 'Icon' },
            { variant: 'fab' as ButtonVariant, label: 'FAB' },
            { variant: 'mini-fab' as ButtonVariant, label: 'Mini FAB' }
        ],
        colors: [
            { color: 'primary' as ButtonColor, label: 'Primary' },
            { color: 'accent' as ButtonColor, label: 'Accent' },
            { color: 'warn' as ButtonColor, label: 'Warn' },
            { color: 'basic' as ButtonColor, label: 'Basic' }
        ],
        states: [
            { disabled: false, loading: false, label: 'Normal' },
            { disabled: true, loading: false, label: 'Disabled' },
            { disabled: false, loading: true, label: 'Loading' }
        ]
    };
}