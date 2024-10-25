import React, { useState, useRef, forwardRef, RefObject } from 'react';

interface CustomInputProps {
    type: string;
    value: string;
    name: string;
    label: string;
    handleChange: (e: any) => void;
    error?: string;
}
export const CustomInput = forwardRef<HTMLInputElement | null, CustomInputProps>(({ type, value, name, label, handleChange, error }, ref) => {
    return (
        <>
            <label>{label}</label>
            <input ref={ref} type={type} value={value} name={name} onChange={(event) => {
                //setName(event.target.value);
                console.log('event', event);
                handleChange(event)
            }} />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
    )
})