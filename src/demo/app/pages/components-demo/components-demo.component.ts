import { Component, ViewEncapsulation, OnInit, ComponentRef, ViewContainerRef, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { CardDemoComponent } from '../../components/card-demo/card-demo.component';
import { DialogDemoComponent } from '../../components/dialog-demo/dialog-demo.component';
import { SidenavDemoComponent } from '../../components/sidenav-demo/sidenav-demo.component';
import { PopoverDemoComponent } from '../../components/popover-demo/popover-demo.component';

// Tab components
import { CardValidationComponent } from '../../components/card-validation/card-validation.component';
import { CardCodeComponent } from '../../components/card-code/card-code.component';
import { CardApiComponent } from '../../components/card-api/card-api.component';
import { DialogValidationComponent } from '../../components/dialog-validation/dialog-validation.component';
import { DialogCodeComponent } from '../../components/dialog-code/dialog-code.component';
import { DialogApiComponent } from '../../components/dialog-api/dialog-api.component';
import { SidenavValidationComponent } from '../../components/sidenav-validation/sidenav-validation.component';
import { SidenavCodeComponent } from '../../components/sidenav-code/sidenav-code.component';
import { SidenavApiComponent } from '../../components/sidenav-api/sidenav-api.component';
import { PopoverValidationComponent } from '../../components/popover-validation/popover-validation.component';
import { PopoverCodeComponent } from '../../components/popover-code/popover-code.component';
import { PopoverApiComponent } from '../../components/popover-api/popover-api.component';
import { DataTableDemoComponent } from '../../components/data-table-demo/data-table-demo.component';

@Component({
    selector: 'amw-demo-components',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        CardDemoComponent,
        DialogDemoComponent,
        SidenavDemoComponent,
        PopoverDemoComponent,
        // Tab components
        CardValidationComponent,
        CardCodeComponent,
        CardApiComponent,
        DialogValidationComponent,
        DialogCodeComponent,
        DialogApiComponent,
        SidenavValidationComponent,
        SidenavCodeComponent,
        SidenavApiComponent,
        PopoverValidationComponent,
        PopoverCodeComponent,
        PopoverApiComponent,
        DataTableDemoComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './components-demo.component.html',
    styleUrl: './components-demo.component.scss'
})
export class ComponentsDemoComponent implements OnInit {
    // Component definitions
    components = [
        { id: 'card', name: 'Card' },
        { id: 'dialog', name: 'Dialog' },
        { id: 'sidenav', name: 'Sidenav' },
        { id: 'popover', name: 'Popover' },
        { id: 'data-table', name: 'Data Table' }
    ];

    selectedComponent = { id: 'card', name: 'Card' };
    selectedTab = 0; // 0 = Variations, 1 = Validation, 2 = Code, 3 = API

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Read the component from route data
        this.route.data.subscribe(data => {
            const componentId = data['component'];
            if (componentId) {
                const component = this.components.find(c => c.id === componentId);
                if (component) {
                    this.selectedComponent = component;
                }
            }
        });
    }
}
