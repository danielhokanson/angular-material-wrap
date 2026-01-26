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
export { AmwFullScreenLoadingComponent } from './components/components/amw-full-screen-loading/amw-full-screen-loading.component';

// Full Screen Loading exports
export { AmwFullScreenLoadingService, loading } from './services/amw-full-screen-loading/amw-full-screen-loading.service';
export type { LoadingItem } from './services/amw-full-screen-loading/amw-full-screen-loading.service';

// Directives exports
export * from './directives';

// Individual directive exports for better tree-shaking
export { AmwTooltipDirective } from './directives/amw-tooltip/amw-tooltip.directive';
export { AmwBadgeDirective } from './directives/amw-badge/amw-badge.directive';
export { AmwValidationTooltipDirective } from './directives/amw-validation-tooltip/amw-validation-tooltip.directive';

// Validation service exports
export { AmwValidationService, ValidationMixin } from './services/amw-validation/amw-validation.service';
export type { ValidationViolation, ValidationConfig, ValidationContext } from './services/amw-validation/amw-validation.service';

// Error State service exports
export { AmwErrorStateService, ErrorStateMixin } from './services/amw-error-state/amw-error-state.service';
export type { ErrorItem, ErrorStateConfig, ErrorContext } from './services/amw-error-state/amw-error-state.service';
export { AmwErrorDisplayComponent } from './components/components/amw-error-display/amw-error-display.component';

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
export { AmwThemeService } from './styling/services/amw-theme.service';
export { AmwThemePickerComponent } from './styling/components/theme-picker/theme-picker.component';
export { AmwThemeEditorComponent } from './styling/components/theme-editor/theme-editor.component';
export { AmwThemeManagerComponent } from './styling/components/theme-manager/theme-manager.component';

/**
 * Signal Forms exports (experimental)
 * Re-exports Angular's experimental Signal Forms API for convenience.
 * @experimental Signal Forms are experimental and may change in future Angular releases.
 *
 * All AMW form controls support the [formField] binding for Signal Forms (Angular 21.1+):
 * - amw-input, amw-textarea, amw-select, amw-checkbox, amw-datepicker, amw-radio-group
 * - amw-autocomplete, amw-button-toggle-group, amw-radio, amw-toggle, amw-switch
 * - amw-slider, amw-range-slider
 *
 * Three mutually exclusive form binding scenarios are supported:
 * 1. ngModel/ngModelChange - Template-driven forms with simple models
 * 2. formControl/formControlName - Reactive forms with FormGroup/FormControl
 * 3. [formField] - Signal Forms with form() and field bindings
 */
export { FormField, form } from '@angular/forms/signals';

// =============================================================================
// NEW MIGRATION EXPORTS - AMW Library Migration Components
// =============================================================================

// Validation module
export * from './validation';

// Inline state components
export { AmwInlineLoadingComponent } from './components/components/amw-inline-loading/amw-inline-loading.component';
export { AmwInlineErrorComponent } from './components/components/amw-inline-error/amw-inline-error.component';
export { AmwInlineEmptyComponent } from './components/components/amw-inline-empty/amw-inline-empty.component';

// HTTP Error Parser utilities
export * from './utilities';

// Interfaces (async state, CRUD service)
export * from './interfaces';

// Constants (error messages)
export * from './constants';

// Event Bus service
export { AmwEventBusService } from './services/amw-event-bus/amw-event-bus.service';
export type { BusEvent, EventBusStatistics } from './services/amw-event-bus/amw-event-bus.service';

// Base Service pattern
export { AmwBaseService } from './services/amw-base-service/amw-base.service';
export type { IBaseService, IServiceHealthStatus, ServiceConfig } from './services/amw-base-service/base-service.interface';
