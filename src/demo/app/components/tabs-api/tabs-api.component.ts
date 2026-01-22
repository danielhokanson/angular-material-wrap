import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-tabs-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs-api.component.html',
  styleUrl: './tabs-api.component.scss'
})
export class TabsApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'selectedIndex',
        type: 'number',
        default: '0',
        description: 'The index of the active tab'
      },
      {
        name: 'animationDuration',
        type: 'string',
        default: '500ms',
        description: 'Duration for the tab change animation'
      },
      {
        name: 'backgroundColor',
        type: 'ThemePalette',
        default: 'null',
        description: 'Background color of the tab group',
        options: ['primary', 'accent', 'warn']
      },
      {
        name: 'color',
        type: 'ThemePalette',
        default: 'primary',
        description: 'Theme color of the tab labels',
        options: ['primary', 'accent', 'warn']
      },
      {
        name: 'disableRipple',
        type: 'boolean',
        default: 'false',
        description: 'Whether ripple effect is disabled',
        options: ['true', 'false']
      },
      {
        name: 'headerPosition',
        type: 'MatTabHeaderPosition',
        default: 'above',
        description: 'Position of the tab header',
        options: ['above', 'below']
      },
      {
        name: 'preserveContent',
        type: 'boolean',
        default: 'false',
        description: 'Whether to preserve tab content when switching tabs',
        options: ['true', 'false']
      }
    ],
    outputs: [
      {
        name: 'selectedIndexChange', type: 'EventEmitter<number>', description: 'Emitted when the selected tab index changes'
      },
      {
        name: 'selectedTabChange', type: 'EventEmitter<MatTabChangeEvent>', description: 'Emitted when the selected tab changes'
      },
      {
        name: 'focusChange', type: 'EventEmitter<MatTabChangeEvent>', description: 'Emitted when focus changes to a different tab'
      },
      {
        name: 'animationDone', type: 'EventEmitter<void>', description: 'Emitted when the tab animation completes'
      }
    ],
    methods: [
      {
        name: 'realignInkBar()',
        returns: 'void',
        description: 'Realigns the ink bar to the selected tab element'
      },
      {
        name: 'focusTab(index: number)',
        returns: 'void',
        description: 'Focuses a particular tab by index'
      }
    ]
  };

  constructor() {

      super();

  }

}
