import { AmwDialogTitleDirective } from './amw-dialog-title.directive';
import { AmwDialogContentDirective } from './amw-dialog-content.directive';
import { AmwDialogActionsDirective } from './amw-dialog-actions.directive';

export { AmwDialogTitleDirective } from './amw-dialog-title.directive';
export { AmwDialogContentDirective } from './amw-dialog-content.directive';
export { AmwDialogActionsDirective } from './amw-dialog-actions.directive';
export { AMW_DIALOG_DATA } from './amw-dialog.tokens';

export const AMW_DIALOG_COMPONENTS = [
    AmwDialogTitleDirective,
    AmwDialogContentDirective,
    AmwDialogActionsDirective
] as const;
