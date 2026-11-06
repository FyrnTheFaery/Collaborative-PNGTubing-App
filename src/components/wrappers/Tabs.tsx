import {
    Tabs as RACTabs,
    TabList as RACTabList,
    type TabListProps,
    type TabProps,
    Tab as RACTab,
    type TabsProps,
    TabPanels as RACTabPanels,
    type TabPanelProps,
    TabPanel as RACTabPanel,
    SelectionIndicator,
    type TabPanelsProps
} from 'react-aria-components/Tabs';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';
import { focusRing } from '../../styles/FocusRing';
import { fieldBorderStyles } from './Field';
import { composeTailwindRenderProps } from '../../utils/ComposeTailwindRenderProps';

const styles = tv({
    extend: focusRing,
    base: 'border-1 rounded-lg min-h-9 font-sans text-sm py-0 px-3 box-border transition',
    variants: {
        isFocused: fieldBorderStyles.variants.isFocusWithin,
        isInvalid: fieldBorderStyles.variants.isInvalid,
        isDisabled: fieldBorderStyles.variants.isDisabled
    }
});

export function Tabs(props: TabsProps) {
    return <RACTabs {...props} className={composeTailwindRenderProps(props.className, "flex flex-col w-full h-fit")}/>;
}

export function TabList<T>(props: TabListProps<T>) {
    return <RACTabList {...props} className={composeTailwindRenderProps(props.className, "flex flex-row w-full h-fit")}/>;
}

const selectionStyles = tv({
    extend: focusRing,
    base: 'border-1 rounded-lg min-h-9 font-sans text-sm py-0 px-3 box-border transition',
    variants: {
        isFocused: fieldBorderStyles.variants.isFocusWithin,
        isInvalid: fieldBorderStyles.variants.isInvalid,
        isDisabled: fieldBorderStyles.variants.isDisabled
    }
});

export function Tab(props: TabProps) {
    return (
        <RACTab {...props}>
            {composeRenderProps(props.children, children => (
                <>
                    {children}
                    <SelectionIndicator className={"bg-blue-500"}/>
                </>
            ))}
        </RACTab>
    );
}

export function TabPanels<T>(props: TabPanelsProps<T>) {
    return <RACTabPanels {...props} className='flex w-full h-fit'/>;
}

export function TabPanel(props: TabPanelProps) {
    return <RACTabPanel {...props} className='flex w-full h-fit'/>;
}