import { Switch } from '@headlessui/react';

interface ISwitchButton {
    title: string;
    enabled: boolean;
    onEnabled?: () => void;
}

function SwitchButton(props: ISwitchButton) {
    const { title, enabled, onEnabled } = props;

    return (
        <div className="">
            <Switch
                checked={enabled}
                onChange={onEnabled}
                className={`${enabled ? 'bg-teal-600' : 'bg-gray-500'}
            relative inline-flex h-[38px] w-[84px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">{title}</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-[46px]' : 'translate-x-0'}
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    );
}

export default SwitchButton;
