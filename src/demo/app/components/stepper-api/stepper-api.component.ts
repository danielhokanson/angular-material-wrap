import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-stepper-api',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="stepper-api-demo">
      <h3>Stepper API Documentation</h3>
      <p>Complete API reference for the stepper component.</p>
      
      <mat-tab-group>
        <mat-tab label="Properties">
          <div class="api-section">
            <h4>MatStepper Properties</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>selectedIndex</code></td>
                    <td><code>number</code></td>
                    <td><code>0</code></td>
                    <td>Index of the currently selected step</td>
                  </tr>
                  <tr>
                    <td><code>linear</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Whether the stepper is linear (requires completion of previous steps)</td>
                  </tr>
                  <tr>
                    <td><code>orientation</code></td>
                    <td><code>'horizontal' | 'vertical'</code></td>
                    <td><code>'horizontal'</code></td>
                    <td>Orientation of the stepper</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="Methods">
          <div class="api-section">
            <h4>MatStepper Methods</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Parameters</th>
                    <th>Return Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>next()</code></td>
                    <td>-</td>
                    <td><code>void</code></td>
                    <td>Goes to the next step</td>
                  </tr>
                  <tr>
                    <td><code>previous()</code></td>
                    <td>-</td>
                    <td><code>void</code></td>
                    <td>Goes to the previous step</td>
                  </tr>
                  <tr>
                    <td><code>reset()</code></td>
                    <td>-</td>
                    <td><code>void</code></td>
                    <td>Resets the stepper to the first step</td>
                  </tr>
                  <tr>
                    <td><code>selectedIndex</code></td>
                    <td>index: number</td>
                    <td><code>void</code></td>
                    <td>Sets the selected step index</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="Events">
          <div class="api-section">
            <h4>MatStepper Events</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>selectionChange</code></td>
                    <td><code>StepperSelectionEvent</code></td>
                    <td>Emitted when the selected step changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="Directives">
          <div class="api-section">
            <h4>Stepper Directives</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Directive</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>matStep</code></td>
                    <td>Defines a step in the stepper</td>
                  </tr>
                  <tr>
                    <td><code>matStepLabel</code></td>
                    <td>Defines the label for a step</td>
                  </tr>
                  <tr>
                    <td><code>matStepperNext</code></td>
                    <td>Button directive to go to next step</td>
                  </tr>
                  <tr>
                    <td><code>matStepperPrevious</code></td>
                    <td>Button directive to go to previous step</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
    styleUrl: './stepper-api.component.scss'
})
export class StepperApiComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
