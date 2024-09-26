import React, { useState } from 'react';


export const ControlledInputs = () => {
    const [value, setValue] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<string>('')


    return (
        <>
            <form onSubmit={() => {
                console.log('value', value);
                console.log('selectedOption', selectedOption);
            }}>
                <input type='text' value={value} onChange={(event) => {
                    setValue(event.target.value);
                }} />
                {selectedOption}
                <select name="select" onChange={(event) => {
                    setSelectedOption(event.target.value);
                }}>
                    <option value="value1" >Value 1</option>

                    <option value="value2">Value 2</option>

                    <option value="value3" >Value 3</option>
                </select>
                <button>Save</button>
            </form>

        </>
    );
}