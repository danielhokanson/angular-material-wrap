import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AmwCurrencyPipe } from '../../../../library/src/pipes/amw-currency/amw-currency.pipe';
import { AmwDatePipe } from '../../../../library/src/pipes/amw-date/amw-date.pipe';
import { AmwTextTransformPipe } from '../../../../library/src/pipes/amw-text-transform/amw-text-transform.pipe';

@Component({
    selector: 'amw-demo-pipes',
    standalone: true,
    imports: [
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    AmwCurrencyPipe,
    AmwDatePipe,
    AmwTextTransformPipe
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './pipes-demo.component.html',
    styleUrl: './pipes-demo.component.scss'
})
export class PipesDemoComponent implements OnInit {
    // Pipe definitions
    pipes = [
        { id: 'currency', name: 'Currency Pipe' },
        { id: 'date', name: 'Date Pipe' },
        { id: 'text-transform', name: 'Text Transform Pipe' }
    ];

    selectedPipe = { id: 'currency', name: 'Currency Pipe' };
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    // Currency pipe properties
    currencyAmount = 1234.56;

    // Date pipe properties
    currentDate = new Date();

    // Text transform pipe properties
    textValue = 'Hello World';

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            if (data['pipe']) {
                const pipe = this.pipes.find(p => p.id === data['pipe']);
                if (pipe) {
                    this.selectedPipe = pipe;
                }
            }
        });
    }
}