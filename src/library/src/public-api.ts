// Controls exports
export * from './controls/components';
export * from './controls/interfaces';

// Individual component exports for better tree-shaking
export { AmwButtonComponent } from './controls/components/amw-button/amw-button.component';
export { AmwInputComponent } from './controls/components/amw-input/amw-input.component';
export { AmwSelectComponent } from './controls/components/amw-select/amw-select.component';
export { AmwRadioGroupComponent } from './controls/components/amw-radio-group/amw-radio-group.component';
export { AmwChipsComponent } from './controls/components/amw-chips/amw-chips.component';
export { AmwChipInputComponent } from './controls/components/amw-chip-input/amw-chip-input.component';
export { AmwFormValidationComponent } from './controls/components/amw-form-validation/amw-form-validation.component';

// New control components
export { AmwIconButtonComponent } from './controls/components/amw-icon-button/amw-icon-button.component';
export { AmwChipComponent } from './controls/components/amw-chip/amw-chip.component';
export { AmwButtonToggleComponent } from './controls/components/amw-button-toggle/amw-button-toggle.component';
export { AmwButtonToggleGroupComponent } from './controls/components/amw-button-toggle/amw-button-toggle-group.component';

// Chip input interfaces
export type { ChipInputOption, ChipInputConfig } from './controls/components/amw-chip-input/interfaces';

// Form validation interfaces and types
export type {
  FormValidationConfig,
  FormValidationError,
  FormValidationDisplayMode,
  FormValidationSeverity
} from './controls/components/amw-form-validation/interfaces';

// Components exports
export * from './components/components';
// export * from './components/interfaces';
// export * from './components/directives';
export * from './components/services';
// export * from './components/pipes';

// Individual component exports for better tree-shaking
export { AmwAccordionComponent } from './components/components/amw-accordion/amw-accordion.component';
export { AmwAccordionPanelComponent } from './components/components/amw-accordion/amw-accordion-panel.component';
export { AmwMenuComponent, AmwMenuItemComponent } from './components/components/amw-menu';
export { AmwMenuTriggerForDirective } from './components/components/amw-menu/amw-menu-trigger.directive';
export { AmwProgressBarComponent } from './components/components/amw-progress-bar/amw-progress-bar.component';
export { AmwProgressSpinnerComponent } from './components/components/amw-progress-spinner/amw-progress-spinner.component';
export { AmwToolbarComponent } from './components/components/amw-toolbar/amw-toolbar.component';
export { AmwDividerComponent } from './components/components/amw-divider/amw-divider.component';
export { AmwIconComponent } from './components/components/amw-icon/amw-icon.component';

// New UI components
export { AmwListComponent } from './components/components/amw-list/amw-list.component';
export { AmwListItemComponent } from './components/components/amw-list/amw-list-item.component';
export { AmwPaginatorComponent } from './components/components/amw-paginator/amw-paginator.component';

// Directives exports
export * from './directives';

// Individual directive exports for better tree-shaking
export { AmwTooltipDirective } from './directives/amw-tooltip/amw-tooltip.directive';
export { AmwBadgeDirective } from './directives/amw-badge/amw-badge.directive';

// Pipes exports
export * from './pipes';

// Services exports
export * from './services';

// Pages exports
export * from './pages/components';
// export * from './pages/directives';
// export * from './pages/interfaces';
// export * from './pages/services';
// export * from './pages/pipes';

// Individual page component exports for better tree-shaking
export { AmwMasterDetailPageComponent } from './pages/components/amw-master-detail-page/amw-master-detail-page.component';
export { AmwDashboardPageComponent } from './pages/components/amw-dashboard-page/amw-dashboard-page.component';

// Page component interfaces and types
export type {
  MasterDetailConfig,
  MasterDetailData,
  MasterDetailDataSource,
  MasterDetailColumn,
  MasterDetailAction,
  DetailSection,
  DetailField
} from './pages/components/amw-master-detail-page/interfaces';

export type {
  DashboardConfig,
  DashboardData,
  DashboardDataSource,
  DashboardStat,
  DashboardWidget,
  DashboardAction
} from './pages/components/amw-dashboard-page/interfaces';

// Styling exports
export * from './styling/components';
export * from './styling/interfaces';
export * from './styling/services';

// Individual styling component exports for better tree-shaking
export { ThemeService } from './styling/services/theme.service';
export { ThemePickerComponent } from './styling/components/theme-picker/theme-picker.component';
export { ThemeEditorComponent } from './styling/components/theme-editor/theme-editor.component';
export { ThemeManagerComponent } from './styling/components/theme-manager/theme-manager.component';
