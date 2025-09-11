import { Chip } from './chip.interface';

/**
 * Chip event interface
 */
export interface ChipEvent {
    /** The chip that triggered the event */
    chip: Chip;
    /** The index of the chip */
    index: number;
    /** The type of event */
    type: 'add' | 'remove' | 'select' | 'deselect' | 'edit' | 'clear';
    /** The original event (if applicable) */
    originalEvent?: Event;
}

/**
 * Chip change event interface
 */
export interface ChipChangeEvent {
    /** The current array of chips */
    chips: Chip[];
    /** The chip that was added/removed/modified */
    changedChip?: Chip;
    /** The type of change */
    changeType: 'add' | 'remove' | 'select' | 'deselect' | 'edit' | 'clear';
    /** The index of the changed chip */
    index?: number;
}
