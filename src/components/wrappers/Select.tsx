import { useRef } from 'react';
import {
    Select as AriaSelect,
    type SelectProps as AriaSelectProps,
    ListBox,
    type ListBoxItemProps,
    SelectValue,
    type ValidationResult
} from 'react-aria-components/Select';
import {tv} from 'tailwind-variants';
import {Description, FieldError, Label} from './Field';
import {DropdownItem, DropdownListBox, DropdownSection, type DropdownSectionProps} from './ListBox';
import {Popover} from './Popover';
import { focusRing } from '../../styles/FocusRing';
import { composeTailwindRenderProps } from '../../utils/ComposeTailwindRenderProps';
import { Icon } from '@iconify/react';
import { /*Autocomplete,*/ Group, type Key, ListBoxProps/*, useFilter*/ } from 'react-aria-components';
import Button from './Button';
import { Tag, TagGroup } from './TagGroup';
// import { SearchField } from './SearchField';

const styles = tv({
    extend: focusRing,
    base: 'flex items-center text-start gap-4 w-full font-sans border border-black/10 dark:border-neutral-600 cursor-default rounded-xl pl-3 pr-2 h-9 min-w-[180px] transition bg-neutral-50 dark:bg-neutral-700 [-webkit-tap-highlight-color:transparent] ' +
    'shadow-[-4px_-4px_10px_-4px_var(--color-neutral-400),4px_4px_10px_4px_var(--color-neutral-900)] disabled:shadow-none ',
    variants: {
        isDisabled: {
            false:
                'text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-200 hover:bg-neutral-100 pressed:bg-neutral-200 dark:hover:bg-neutral-600/70 dark:pressed:bg-neutral-500 group-invalid:outline group-invalid:outline-red-600 forced-colors:group-invalid:outline-[Mark]',
            true: 'border-transparent dark:border-transparent text-neutral-200 dark:text-neutral-600 forced-colors:text-[GrayText] bg-neutral-100 dark:bg-neutral-800'
        }
    }
});

export interface SelectProps<T, M extends 'single' | 'multiple'> extends Omit<AriaSelectProps<T, M>, 'children'> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    items?: Iterable<T>;
    children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T, M extends 'single' | 'multiple' = 'single'>({
    label,
    description,
    errorMessage,
    children,
    items,
    ...props
}: SelectProps<T, M>) {
    return (
        <AriaSelect
            {...props}
            className={composeTailwindRenderProps(
                props.className,
                'group flex flex-col gap-1 relative font-sans'
            )}
        >
            {label && <Label>{label}</Label>}
            <Button className={styles}>
                <SelectValue className="flex-1 text-sm">
                    {({selectedText, defaultChildren}) => selectedText || defaultChildren}
                </SelectValue>
                <Icon icon="material-symbols:keyboard-arrow-down-rounded"/>
            </Button>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
            <Popover className="min-w-(--trigger-width)">
                <ListBox
                    items={items}
                    className="outline-hidden box-border dark:bg-neutral-800 p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]"
                >
                    {children}
                </ListBox>
            </Popover>
        </AriaSelect>
    );
}


export interface SelectTag {
    id: Key;
    name: string;
}

export interface SelectWithTagGroupProps<T extends SelectTag> extends Omit<AriaSelectProps<T, 'multiple'>, 'children' | 'selectionMode'> {
    label?: string;
    tags: Iterable<T>;
}

// Renders AriaSelect directly (not the Select wrapper above), since the Select wrapper puts its children inside a ListBox
export function SelectWithTagGroup<T extends SelectTag>({label, tags, ...props}: SelectWithTagGroupProps<T>) {
    let triggerRef = useRef<HTMLDivElement | null>(null);

    return (
        <AriaSelect
            {...props}
            selectionMode="multiple"
            className={composeTailwindRenderProps(
                props.className,
                'group flex flex-col gap-1 relative font-sans'
            )}
        >
            {label && <Label>{label}</Label>}
            <Group aria-label={props['aria-label'] ?? label} ref={triggerRef} className="flex flex-row items-center gap-4">
                <Button variant="secondary">
                    <Icon icon="material-symbols:filter-alt-outline"/>
                    Select Tags
                </Button>
                <SelectValue<T> className="flex-1 bg-transparent rounded-xl items-center text-center">
                    {({selectedItems, state}) => (
                        <TagGroup
                            aria-label="Selected Tags"
                            items={selectedItems.filter(item => item != null)}
                            renderEmptyState={() => {}}
                            onRemove={(keys) => {
                                if (Array.isArray(state.value)) {
                                    state.setValue(state.value.filter(k => !keys.has(k)));
                                }
                            }}
                        >
                            {item => <Tag>{item.name}</Tag>}
                        </TagGroup>
                    )}
                </SelectValue>
            </Group>
            <Popover
                // Position popover relative to the wrapping div instead of the Button
                triggerRef={triggerRef}
                showArrow
                className="flex flex-col w-[250px] p-1">
                {/* <Autocomplete filter={contains}>
                    <SearchField aria-label="Search tags" placeholder="Search tags" autoFocus className="mb-1" /> */}
                    <SelectListBox items={tags}>
                        {tag => <SelectItem>{tag.name}</SelectItem>}
                    </SelectListBox>
                {/* </Autocomplete> */}
            </Popover>
        </AriaSelect>
    );
}

export function SelectListBox<T>(props: ListBoxProps<T>) {
    return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
    return <DropdownItem {...props} />;
}

export function SelectSection<T>(props: DropdownSectionProps<T>) {
    return <DropdownSection {...props} />;
}