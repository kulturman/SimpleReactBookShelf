import { useState } from 'react'

export const useFormTextField = defaultValue => {

    const [ value , setValue ] = useState(defaultValue);

    const onChangeHandler = e => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: onChangeHandler
    }
}