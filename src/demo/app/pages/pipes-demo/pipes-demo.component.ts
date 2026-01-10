import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AmwCurrencyPipe } from '../../../../library/src/pipes/amw-currency/amw-currency.pipe';
import { AmwDatePipe } from '../../../../library/src/pipes/amw-date/amw-date.pipe';
import { AmwTextTransformPipe } from '../../../../library/src/pipes/amw-text-transform/amw-text-transform.pipe';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-pipes',
    standalone: true,
    imports: [
    MatIconModule,
    FormsModule,
    AmwCurrencyPipe,
    AmwDatePipe,
    AmwTextTransformPipe,
    AmwTabsComponent,
    AmwInputComponent
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

    // Currency Pipe code examples
    currencyPipeCodeExamples = {
        basic: `<!-- Basic currency formatting -->
<p>Price: {{ 1234.56 | amwCurrency }}</p>
<!-- Output: Price: $1,234.56 -->`,

        different: `<!-- Different currencies -->
<p>USD: {{ 1234.56 | amwCurrency:'USD' }}</p>
<p>EUR: {{ 1234.56 | amwCurrency:'EUR' }}</p>
<p>GBP: {{ 1234.56 | amwCurrency:'GBP' }}</p>
<p>JPY: {{ 150000 | amwCurrency:'JPY' }}</p>
<!-- Output:
USD: $1,234.56
EUR: €1,234.56
GBP: £1,234.56
JPY: ¥150,000
-->`,

        display: `<!-- Currency display modes -->
<p>Symbol: {{ 1234.56 | amwCurrency:'USD':'symbol' }}</p>
<p>Code: {{ 1234.56 | amwCurrency:'USD':'code' }}</p>
<p>Name: {{ 1234.56 | amwCurrency:'USD':'name' }}</p>
<!-- Output:
Symbol: $1,234.56
Code: USD 1,234.56
Name: 1,234.56 US dollars
-->`,

        digits: `<!-- Custom digit formatting -->
<p>Default: {{ 1234.567 | amwCurrency:'USD':'symbol':'1.2-2' }}</p>
<p>No decimals: {{ 1234.567 | amwCurrency:'USD':'symbol':'1.0-0' }}</p>
<p>3 decimals: {{ 1234.567 | amwCurrency:'USD':'symbol':'1.3-3' }}</p>
<p>Variable: {{ 1234.567 | amwCurrency:'USD':'symbol':'1.1-3' }}</p>
<!-- Output:
Default: $1,234.57
No decimals: $1,235
3 decimals: $1,234.567
Variable: $1,234.567
-->`,

        locale: `<!-- Different locales -->
<p>US Format: {{ 1234.56 | amwCurrency:'USD':'symbol':'1.2-2':'en-US' }}</p>
<p>German Format: {{ 1234.56 | amwCurrency:'EUR':'symbol':'1.2-2':'de-DE' }}</p>
<p>French Format: {{ 1234.56 | amwCurrency:'EUR':'symbol':'1.2-2':'fr-FR' }}</p>
<!-- Output:
US Format: $1,234.56
German Format: 1.234,56 €
French Format: 1 234,56 €
-->`,

        binding: `<!-- Using with component properties -->
<amw-input
  label="Amount"
  [(ngModel)]="price"
  type="number"
  appearance="outline">
</amw-input>
<p>Total: {{ price | amwCurrency:'USD' }}</p>

<!-- Component -->
export class MyComponent {
  price = 1234.56;
}`
    };

    // Currency Pipe API documentation
    currencyPipeApiDocumentation = {
        parameters: [
            {
                name: 'value',
                type: 'number | string | null | undefined',
                required: 'Yes',
                description: 'The numeric value to format. String values will be parsed to numbers.'
            },
            {
                name: 'currencyCode',
                type: 'string',
                default: '"USD"',
                description: 'ISO 4217 currency code (e.g., USD, EUR, GBP, JPY)'
            },
            {
                name: 'display',
                type: "'symbol' | 'code' | 'name'",
                default: '"symbol"',
                description: 'How to display the currency: symbol ($), code (USD), or name (US dollars)'
            },
            {
                name: 'digitsInfo',
                type: 'string',
                default: '"1.2-2"',
                description: 'Decimal representation format: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}'
            },
            {
                name: 'locale',
                type: 'string',
                default: '"en-US"',
                description: 'Locale code for number formatting (e.g., en-US, de-DE, fr-FR)'
            }
        ],
        currencyCodes: [
            { code: 'USD', symbol: '$', name: 'US Dollar' },
            { code: 'EUR', symbol: '€', name: 'Euro' },
            { code: 'GBP', symbol: '£', name: 'British Pound' },
            { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
            { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
            { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
            { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
            { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
        ],
        quickExamples: {
            basic: "{{ 1234.56 | amwCurrency }}",
            eurSymbol: "{{ 1234.56 | amwCurrency:'EUR' }}",
            noDecimals: "{{ 1234 | amwCurrency:'USD':'symbol':'1.0-0' }}",
            germanLocale: "{{ 1234.56 | amwCurrency:'EUR':'symbol':'1.2-2':'de-DE' }}"
        },
        digitFormatString: "{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}"
    };

    // Date Pipe code examples
    datePipeCodeExamples = {
        basic: `<!-- Basic date formatting -->
<p>Today: {{ currentDate | amwDate }}</p>
<!-- Output: Today: Jan 15, 2025, 10:30 AM -->`,

        formats: `<!-- Different date formats -->
<p>Short: {{ currentDate | amwDate:'short' }}</p>
<p>Medium: {{ currentDate | amwDate:'medium' }}</p>
<p>Long: {{ currentDate | amwDate:'long' }}</p>
<p>Full: {{ currentDate | amwDate:'full' }}</p>
<!-- Output:
Short: Jan 15, 2025
Medium: Jan 15, 2025, 10:30 AM
Long: January 15, 2025, 10:30:45 AM
Full: Monday, January 15, 2025, 10:30:45 AM
-->`,

        dateTime: `<!-- Date and time separately -->
<p>Date only: {{ currentDate | amwDate:'date' }}</p>
<p>Time only: {{ currentDate | amwDate:'time' }}</p>
<p>Date & Time: {{ currentDate | amwDate:'datetime' }}</p>
<!-- Output:
Date only: Jan 15, 2025
Time only: 10:30 AM
Date & Time: Jan 15, 2025, 10:30 AM
-->`,

        locale: `<!-- Different locales -->
<p>US: {{ currentDate | amwDate:'medium':'':'en-US' }}</p>
<p>German: {{ currentDate | amwDate:'medium':'':'de-DE' }}</p>
<p>French: {{ currentDate | amwDate:'medium':'':'fr-FR' }}</p>
<p>Japanese: {{ currentDate | amwDate:'medium':'':'ja-JP' }}</p>
<!-- Output depends on locale settings -->`,

        input: `<!-- Different input types -->
<p>Date object: {{ dateObj | amwDate }}</p>
<p>ISO string: {{ '2025-01-15T10:30:00' | amwDate }}</p>
<p>Timestamp: {{ 1736939400000 | amwDate }}</p>

<!-- Component -->
export class MyComponent {
  dateObj = new Date();
}`,

        binding: `<!-- Using with form data -->
<amw-datepicker
  label="Select Date"
  [(ngModel)]="selectedDate"
  appearance="outline">
</amw-datepicker>
<p>Selected: {{ selectedDate | amwDate:'long' }}</p>

<!-- Component -->
export class MyComponent {
  selectedDate = new Date();
}`
    };

    // Date Pipe API documentation
    datePipeApiDocumentation = {
        parameters: [
            {
                name: 'value',
                type: 'Date | string | number | null | undefined',
                required: 'Yes',
                description: 'The date value to format. Accepts Date objects, ISO strings, or timestamps.'
            },
            {
                name: 'format',
                type: 'string',
                default: '"medium"',
                description: 'Predefined format: short, medium, long, full, date, time, datetime'
            },
            {
                name: 'timezone',
                type: 'string',
                default: 'undefined',
                description: 'Timezone offset or name (currently unused, reserved for future use)'
            },
            {
                name: 'locale',
                type: 'string',
                default: '"en-US"',
                description: 'Locale code for date formatting (e.g., en-US, de-DE, fr-FR, ja-JP)'
            }
        ],
        formats: [
            {
                format: 'short',
                pattern: 'MMM d, y',
                example: 'Jan 15, 2025',
                description: 'Short date format'
            },
            {
                format: 'medium',
                pattern: 'MMM d, y, h:mm a',
                example: 'Jan 15, 2025, 10:30 AM',
                description: 'Medium date and time format'
            },
            {
                format: 'long',
                pattern: 'MMMM d, y, h:mm:ss a',
                example: 'January 15, 2025, 10:30:45 AM',
                description: 'Long date and time with seconds'
            },
            {
                format: 'full',
                pattern: 'EEEE, MMMM d, y, h:mm:ss a',
                example: 'Monday, January 15, 2025, 10:30:45 AM',
                description: 'Full date with weekday'
            },
            {
                format: 'date',
                pattern: 'MMM d, y',
                example: 'Jan 15, 2025',
                description: 'Date only (no time)'
            },
            {
                format: 'time',
                pattern: 'h:mm a',
                example: '10:30 AM',
                description: 'Time only (no date)'
            },
            {
                format: 'datetime',
                pattern: 'MMM d, y, h:mm a',
                example: 'Jan 15, 2025, 10:30 AM',
                description: 'Date and time (same as medium)'
            }
        ],
        quickExamples: {
            basic: "{{ date | amwDate }}",
            shortFormat: "{{ date | amwDate:'short' }}",
            timeOnly: "{{ date | amwDate:'time' }}",
            germanLocale: "{{ date | amwDate:'medium':'':'de-DE' }}"
        }
    };

    // Text Transform Pipe code examples
    textTransformPipeCodeExamples = {
        basic: `<!-- Basic text transformation -->
<p>Original: {{ 'hello world' }}</p>
<p>Uppercase: {{ 'hello world' | amwTextTransform:'uppercase' }}</p>
<!-- Output:
Original: hello world
Uppercase: HELLO WORLD
-->`,

        casing: `<!-- Different case transformations -->
<p>Uppercase: {{ 'hello world' | amwTextTransform:'uppercase' }}</p>
<p>Lowercase: {{ 'HELLO WORLD' | amwTextTransform:'lowercase' }}</p>
<p>Capitalize: {{ 'hello world' | amwTextTransform:'capitalize' }}</p>
<p>Title Case: {{ 'hello world' | amwTextTransform:'titlecase' }}</p>
<!-- Output:
Uppercase: HELLO WORLD
Lowercase: hello world
Capitalize: Hello world
Title Case: Hello World
-->`,

        programming: `<!-- Programming case styles -->
<p>Camel Case: {{ 'hello world example' | amwTextTransform:'camelcase' }}</p>
<p>Kebab Case: {{ 'hello world example' | amwTextTransform:'kebabcase' }}</p>
<p>Snake Case: {{ 'hello world example' | amwTextTransform:'snakecase' }}</p>
<!-- Output:
Camel Case: helloWorldExample
Kebab Case: hello-world-example
Snake Case: hello_world_example
-->`,

        conversion: `<!-- Convert between programming styles -->
<p>From camelCase: {{ 'myVariableName' | amwTextTransform:'kebabcase' }}</p>
<p>From PascalCase: {{ 'MyClassName' | amwTextTransform:'snakecase' }}</p>
<p>From snake_case: {{ 'my_variable_name' | amwTextTransform:'camelcase' }}</p>
<!-- Output:
From camelCase: my-variable-name
From PascalCase: my-class-name
From snake_case: myVariableName
-->`,

        binding: `<!-- Using with component properties -->
<amw-input
  label="Text to Transform"
  [(ngModel)]="inputText"
  appearance="outline">
</amw-input>

<amw-select
  label="Transform Type"
  [(ngModel)]="transformType"
  appearance="outline">
  <mat-option value="uppercase">Uppercase</mat-option>
  <mat-option value="lowercase">Lowercase</mat-option>
  <mat-option value="titlecase">Title Case</mat-option>
  <mat-option value="camelcase">Camel Case</mat-option>
  <mat-option value="kebabcase">Kebab Case</mat-option>
  <mat-option value="snakecase">Snake Case</mat-option>
</amw-select>

<p>Result: {{ inputText | amwTextTransform:transformType }}</p>

<!-- Component -->
export class MyComponent {
  inputText = 'hello world';
  transformType = 'uppercase';
}`,

        chaining: `<!-- Chaining with other pipes -->
<p>{{ userName | amwTextTransform:'titlecase' }}</p>
<p>{{ 'user_first_name' | amwTextTransform:'titlecase' }}</p>
<p>{{ apiEndpoint | amwTextTransform:'uppercase' }}</p>

<!-- Component -->
export class MyComponent {
  userName = 'john doe';
  apiEndpoint = '/api/users';
}`
    };

    // Text Transform Pipe API documentation
    textTransformPipeApiDocumentation = {
        parameters: [
            {
                name: 'value',
                type: 'string | null | undefined',
                required: 'Yes',
                description: 'The text string to transform. Returns null for null/undefined/empty values.'
            },
            {
                name: 'transform',
                type: "'uppercase' | 'lowercase' | 'capitalize' | 'titlecase' | 'camelcase' | 'kebabcase' | 'snakecase'",
                default: '"uppercase"',
                description: 'The type of transformation to apply to the text'
            }
        ],
        transforms: [
            {
                type: 'uppercase',
                description: 'Converts all characters to uppercase',
                example: 'hello world → HELLO WORLD'
            },
            {
                type: 'lowercase',
                description: 'Converts all characters to lowercase',
                example: 'HELLO WORLD → hello world'
            },
            {
                type: 'capitalize',
                description: 'Capitalizes the first character, lowercases the rest',
                example: 'hello world → Hello world'
            },
            {
                type: 'titlecase',
                description: 'Capitalizes the first letter of each word',
                example: 'hello world → Hello World'
            },
            {
                type: 'camelcase',
                description: 'Converts to camelCase (first word lowercase, subsequent words capitalized, no spaces)',
                example: 'hello world → helloWorld'
            },
            {
                type: 'kebabcase',
                description: 'Converts to kebab-case (all lowercase, words separated by hyphens)',
                example: 'hello world → hello-world'
            },
            {
                type: 'snakecase',
                description: 'Converts to snake_case (all lowercase, words separated by underscores)',
                example: 'hello world → hello_world'
            }
        ],
        quickExamples: {
            uppercase: "{{ text | amwTextTransform:'uppercase' }}",
            titleCase: "{{ text | amwTextTransform:'titlecase' }}",
            camelCase: "{{ text | amwTextTransform:'camelcase' }}",
            kebabCase: "{{ text | amwTextTransform:'kebabcase' }}"
        }
    };
}