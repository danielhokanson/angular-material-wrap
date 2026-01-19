// Re-export all standalone components for easy importing

// Dialog components
export { AmwDialogTitleDirective } from './amw-dialog/amw-dialog-title.directive';
export { AmwDialogContentDirective } from './amw-dialog/amw-dialog-content.directive';
export { AmwDialogActionsDirective } from './amw-dialog/amw-dialog-actions.directive';
export { AMW_DIALOG_DATA } from './amw-dialog/amw-dialog.tokens';
export { AMW_DIALOG_COMPONENTS } from './amw-dialog/amw-dialog.module';

// Table components
export {
    AmwColumnDefDirective,
    AmwHeaderCellDefDirective,
    AmwCellDefDirective,
    AmwHeaderRowDefDirective,
    AmwRowDefDirective,
    AmwTableComponent,
    AMW_TABLE_COMPONENTS
} from './amw-table/amw-table.module';

// Sort components
export {
    AmwSort,
    AmwSortDirective,
    AmwSortHeaderComponent,
    AMW_SORT_COMPONENTS
} from './amw-sort/amw-sort.module';

// Expansion components
export {
    AmwAccordionComponent,
    AmwExpansionPanelComponent,
    AmwExpansionPanelHeaderComponent,
    AmwPanelTitleDirective,
    AmwPanelDescriptionDirective,
    AMW_EXPANSION_COMPONENTS
} from './amw-expansion/amw-expansion.module';

// List components
export {
    AmwListComponent,
    AmwListItemComponent,
    AmwListItemIconDirective,
    AmwListItemAvatarDirective,
    AmwListItemTitleDirective,
    AmwListItemLineDirective,
    AmwListItemMetaDirective,
    AMW_LIST_COMPONENTS
} from './amw-list/amw-list.module';

// Button toggle components
export {
    AmwButtonToggleGroupComponent,
    AmwButtonToggleComponent,
    AMW_BUTTON_TOGGLE_COMPONENTS
} from './amw-button-toggle/amw-button-toggle.module';

// Paginator component
export {
    AmwPaginatorComponent,
    AmwPageEvent,
    AMW_PAGINATOR_COMPONENTS
} from './amw-paginator/amw-paginator.component';

// Divider component
export {
    AmwDividerComponent,
    AMW_DIVIDER_COMPONENTS
} from './amw-divider/amw-divider.component';

// Badge directive
export {
    AmwBadgeDirective,
    AMW_BADGE_COMPONENTS
} from './amw-badge/amw-badge.directive';

// Chip component
export {
    AmwChipComponent,
    AMW_CHIP_COMPONENTS
} from './amw-chip/amw-chip.component';

// Combined array of all standalone components for convenience
export const AMW_ALL_COMPONENTS = [
    // Dialog
    ...AMW_DIALOG_COMPONENTS,
    // Table
    ...AMW_TABLE_COMPONENTS,
    // Sort
    ...AMW_SORT_COMPONENTS,
    // Expansion
    ...AMW_EXPANSION_COMPONENTS,
    // List
    ...AMW_LIST_COMPONENTS,
    // Button toggle
    ...AMW_BUTTON_TOGGLE_COMPONENTS,
    // Paginator
    ...AMW_PAGINATOR_COMPONENTS,
    // Divider
    ...AMW_DIVIDER_COMPONENTS,
    // Badge
    ...AMW_BADGE_COMPONENTS,
    // Chip
    ...AMW_CHIP_COMPONENTS
] as const;
