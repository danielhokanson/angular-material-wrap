import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwAccordionComponent, AmwExpansionPanelComponent, AmwExpansionPanelHeaderComponent, AmwPanelTitleDirective, AmwPanelDescriptionDirective } from '../../../../lib/amw-expansion/amw-expansion.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-expansion',
    standalone: true,
    imports: [CommonModule, AmwAccordionComponent, AmwExpansionPanelComponent, AmwExpansionPanelHeaderComponent, AmwPanelTitleDirective, AmwPanelDescriptionDirective, AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './expansion-demo.component.html',
    styleUrl: './expansion-demo.component.scss'
})
export class ExpansionDemoComponent {
    panelOpenState = signal(false);
    multiMode = signal(false);

    faqItems = [
        {
            question: 'What is Angular Material?',
            answer: 'Angular Material is a UI component library for Angular developers. It implements Google\'s Material Design specification.'
        },
        {
            question: 'What is AMW?',
            answer: 'AMW (Angular Material Wrap) is a wrapper library that provides simplified APIs for Angular Material components.'
        },
        {
            question: 'How do I get started?',
            answer: 'Install the library via npm, import the modules you need, and start using the components in your templates.'
        }
    ];

    onPanelOpened(): void {
        this.panelOpenState.set(true);
    }

    onPanelClosed(): void {
        this.panelOpenState.set(false);
    }

    toggleMultiMode(): void {
        this.multiMode.update(v => !v);
    }
}
