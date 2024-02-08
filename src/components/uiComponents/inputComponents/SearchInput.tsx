// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { GroupBase, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import type { AsyncProps } from 'react-select/async';

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const customStyle: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#C9C9C9',
    borderRadius: 8,
    padding: '8px'
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = '#ccc';
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isSelected ? color : isFocused ? color : undefined,
      color: isDisabled ? '#ccc' : isSelected ? 'white' : isFocused ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? color : '#ccc') : undefined
      }
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles) => ({ ...styles, ...dot('#ccc') })
};

export interface AsyncSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends AsyncProps<Option, IsMulti, Group> {}

export default function SearchInput(props: AsyncSelectProps<unknown>) {
  return <AsyncSelect styles={customStyle} className="mt-4" {...props} />;
}
