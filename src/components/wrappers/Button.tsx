import { composeRenderProps, Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../../styles/FocusRing';

export interface ButtonProps extends AriaButtonProps {
    /** @default 'primary' */
    variant?: 'primary' | 'secondary' | 'destructive' | 'quiet'
}

let button = tv({
    extend: focusRing,
    base: "flex flex-row justify-center items-center w-fit h-fit p-2 gap-1 rounded-xl",
    variants: {
        variant: {
            primary: 'bg-linear-to-br dark:from-violet-200/50 dark:via-violet-400/50 dark:to-violet-600/50 ' + 
                'hover:bg-linear-to-br dark:hover:from-violet-200/50 dark:hover:via-violet-300/50 dark:hover:to-violet-400/50 ' +
                'active:bg-linear-to-br dark:active:from-violet-700/50 dark:active:via-violet-500/50 dark:active:to-violet-400/50 ' +
                'disabled:bg-linear-to-br dark:disabled:from-neutral-700 dark:disabled:via-neutral-700 dark:disabled:to-neutral-700 ' +
                'shadow-[-4px_-4px_10px_-4px_var(--color-neutral-400),4px_4px_10px_4px_var(--color-neutral-900)] disabled:shadow-none ' +
                'border-1 border-neutral-600 ' +
                'cursor-pointer disabled:cursor-not-allowed disabled:dark:text-neutral-400 active:dark:text-violet-300',
            secondary: 'bg-linear-to-br dark:from-neutral-500 dark:via-neutral-700 dark:to-neutral-900 ' + 
                'hover:bg-linear-to-br dark:hover:from-neutral-500 dark:hover:via-neutral-600 dark:hover:to-neutral-700 ' +
                'active:bg-linear-to-br dark:active:from-neutral-900 dark:active:via-neutral-800 dark:active:to-neutral-700 ' +
                'disabled:bg-linear-to-br dark:disabled:from-neutral-700 dark:disabled:via-neutral-700 dark:disabled:to-neutral-700 ' +
                'shadow-[-4px_-4px_10px_-4px_var(--color-neutral-400),4px_4px_10px_4px_var(--color-neutral-900)] disabled:shadow-none ' +
                'border-1 border-neutral-600 dark:hover:border-neutral-600 dark:active:border-neutral-600 ' +
                'cursor-pointer disabled:cursor-not-allowed disabled:dark:text-neutral-400 active:dark:text-neutral-300',
            destructive: 'bg-linear-to-br dark:from-rose-300/50 dark:via-rose-400/50 dark:to-rose-500/50 ' + 
                'hover:bg-linear-to-br dark:hover:from-rose-200/50 dark:hover:via-rose-300/50 dark:hover:to-rose-400/50 ' +
                'active:bg-linear-to-br dark:active:from-rose-600/50 dark:active:via-rose-500/50 dark:active:to-rose-400/50 ' +
                'disabled:bg-linear-to-br dark:disabled:from-neutral-700 dark:disabled:via-neutral-700 dark:disabled:to-neutral-700 ' +
                'dark:disabled:bg-neutral-700 ' +
                'shadow-[-4px_-4px_10px_-4px_var(--color-neutral-400),4px_4px_10px_4px_var(--color-neutral-900)] disabled:shadow-none ' +
                'border-1 border-neutral-600 ' +
                'cursor-pointer disabled:cursor-not-allowed disabled:dark:text-neutral-400 active:dark:text-rose-300',
            quiet: 'border-0 bg-transparent hover:bg-neutral-200 pressed:bg-neutral-300 text-neutral-800 dark:hover:bg-neutral-700 dark:pressed:bg-neutral-600 dark:text-neutral-100'
        },
        disabled: {
            true: 'bg-transparent text-neutral-300 dark:text-neutral-500 hover:bg-transparent pressed:bg-transparent active:bg-transparent cursor-default'
        },
        isPending: {
            true: 'text-transparent'
        }
    },
    defaultVariants: {
        variant: 'primary'
    },
    // compoundVariants: [
    //     {
    //         variant: 'secondary',
    //         isDisabled: true,
    //         class: 'bg-transparent dark:bg-neutral-800 text-neutral-300 dark:text-neutral-500 hover:bg-transparent pressed:bg-transparent active:bg-transparent'
    //     },
    //     {
    //         variant: 'destructive',
    //         isDisabled: true,
    //         class: 'border-transparent dark:border-transparent hover:border-transparent active:border-transparent bg-transparent dark:bg-transparent text-neutral-300 dark:text-neutral-500 hover:bg-transparent pressed:bg-transparent active:bg-transparent'
    //     },
    //     {
    //         variant: 'quiet',
    //         isDisabled: true,
    //         class: 'bg-transparent dark:bg-transparent'
    //     }
    // ]
});

const Button: React.FC<ButtonProps> = (props) => {
    return (
        //<div className='flex w-fit h-fit rounded-xl bg-neutral-200 dark:bg-neutral-800 shadow-[-4px_-4px_10px_-4px_var(--color-neutral-500),4px_4px_10px_4px_var(--color-neutral-800)]'>
            <AriaButton
                {...props}
                className={composeRenderProps(
                    props.className,
                    (className, renderProps) => button({...renderProps, variant: props.variant, className})
                )}
            >
                {composeRenderProps(props.children, (children, {isPending}) => (
                    <>
                        {children}
                        {isPending && (
                            <span aria-hidden className="flex absolute inset-0 justify-center items-center">
                                <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" stroke={props.variant === 'secondary' || props.variant === 'quiet' ? 'light-dark(black, white)' : 'white'}>
                                    <circle cx="12" cy="12" r="10" strokeWidth="4" fill="none" className="opacity-25" />
                                    <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" fill="none" pathLength="100" strokeDasharray="60 140" strokeDashoffset="0" />
                                </svg>
                            </span>
                        )}
                    </>
                ))}
            </AriaButton>
       // </div>
    );
}

export default Button;