import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { FaCheck, FaAngleDoubleDown } from 'react-icons/fa';

interface IComboBox {
    zIndex: string;
    list: IListComboBox[];
    type?: string;
    select?: string;
    onSet?: (param: IListComboBox, type: string) => void;
}

export interface IListComboBox {
    code: string;
    name: string;
    des: string;
}

export default function (props: IComboBox) {
    const { zIndex, list, type, select, onSet } = props;

    const initialSelected = select ? list.find((item) => item.code === select) || list[0] : list[0];

    const [selected, setSelected] = useState<IListComboBox>(initialSelected);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (onSet && type) {
            onSet(selected, type);
        }
    }, [selected]);

    const filteredPeople =
        query === ''
            ? list
            : list.filter((person) =>
                  person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
              );

    return (
        <div className={`${zIndex} relative`}>
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1 ">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2  text-left shadow-md sm:text-sm">
                        <Combobox.Input
                            className="w-full  py-2 pl-3 pr-10 text-3xl font-semibold tracking-wider dark:bg-dark-content dark:text-white leading-5 text-gray-900  outline-none"
                            displayValue={(list: IListComboBox) => list.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <FaAngleDoubleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-content dark:text-white py-1 text-3xl shadow-2xl ring-2 ring-black/5  sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.code}
                                        className={({ active }) =>
                                            `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                                                active ? 'bg-teal-600 text-white' : 'text-gray-900 dark:text-white'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
