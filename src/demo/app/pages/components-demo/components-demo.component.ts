import { Component, ViewEncapsulation, OnInit, ComponentRef, ViewContainerRef, Type } from '@angular/core';

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
import { DataTableValidationComponent } from '../../components/data-table-validation/data-table-validation.component';
import { DataTableCodeComponent } from '../../components/data-table-code/data-table-code.component';
import { DataTableApiComponent } from '../../components/data-table-api/data-table-api.component';
import { CalendarDemoComponent } from '../../components/calendar-demo/calendar-demo.component';
import { StepperDemoComponent } from '../../components/stepper-demo/stepper-demo.component';
import { StepperValidationComponent } from '../../components/stepper-validation/stepper-validation.component';
import { StepperCodeComponent } from '../../components/stepper-code/stepper-code.component';
import { StepperApiComponent } from '../../components/stepper-api/stepper-api.component';
import { TabsDemoComponent } from '../../components/tabs-demo/tabs-demo.component';
import { AccordionDemoComponent } from '../../components/accordion-demo/accordion-demo.component';
import { AccordionApiComponent } from '../../components/accordion-api/accordion-api.component';
import { AccordionCodeComponent } from '../../components/accordion-code/accordion-code.component';
import { AccordionValidationComponent } from '../../components/accordion-validation/accordion-validation.component';
import { ChipsApiComponent } from '../../components/chips-api/chips-api.component';
import { ChipsCodeComponent } from '../../components/chips-code/chips-code.component';
import { ChipsValidationComponent } from '../../components/chips-validation/chips-validation.component';
import { CalendarApiComponent } from '../../components/calendar-api/calendar-api.component';
import { CalendarCodeComponent } from '../../components/calendar-code/calendar-code.component';
import { CalendarValidationComponent } from '../../components/calendar-validation/calendar-validation.component';
import { TabsApiComponent } from '../../components/tabs-api/tabs-api.component';
import { TabsCodeComponent } from '../../components/tabs-code/tabs-code.component';
import { TabsValidationComponent } from '../../components/tabs-validation/tabs-validation.component';
import { ThemeApiComponent } from '../../components/theme-api/theme-api.component';
import { ThemeCodeComponent } from '../../components/theme-code/theme-code.component';
import { ThemeValidationComponent } from '../../components/theme-validation/theme-validation.component';

@Component({
    selector: 'amw-demo-components',
    standalone: true,
    imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CardDemoComponent,
    DialogDemoComponent,
    SidenavDemoComponent,
    PopoverDemoComponent,
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
    DataTableDemoComponent,
    DataTableValidationComponent,
    DataTableCodeComponent,
    DataTableApiComponent,
    CalendarDemoComponent,
    StepperDemoComponent,
    StepperValidationComponent,
    StepperCodeComponent,
    StepperApiComponent,
    TabsDemoComponent,
    AccordionDemoComponent,
    AccordionApiComponent,
    AccordionCodeComponent,
    AccordionValidationComponent,
    ChipsApiComponent,
    ChipsCodeComponent,
    ChipsValidationComponent,
    CalendarApiComponent,
    CalendarCodeComponent,
    CalendarValidationComponent,
    TabsApiComponent,
    TabsCodeComponent,
    TabsValidationComponent,
    ThemeApiComponent,
    ThemeCodeComponent,
    ThemeValidationComponent
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
        { id: 'data-table', name: 'Data Table' },
        { id: 'calendar', name: 'Calendar' },
        { id: 'stepper', name: 'Stepper' },
        { id: 'tabs', name: 'Tabs' },
        { id: 'accordion', name: 'Accordion' },
        { id: 'chips', name: 'Chips' },
        { id: 'theme', name: 'Theme' }
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
