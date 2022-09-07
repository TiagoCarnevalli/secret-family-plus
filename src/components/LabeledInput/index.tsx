import React, { useState } from 'react';
import './styles.scss';

interface LabeledInputProps {
    id?: string;
    key?: string | number;
    label: string;
    value: string | number | readonly string[];
    type: React.HTMLInputTypeAttribute;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    action?: any;
    actionFunction?: () => void;
}

export default function LabeledInput(props: LabeledInputProps) {
    const [focused, setFocused] = useState(false);
    const [inputed, setInputed] = useState(false);

    return (
        <div className={`input-container ${focused ? 'container-focused' : ''}`}>
            <div 
                id={props.id} 
                key={props.key} 
                className='input-content'
            >
                <label className={`input-label ${inputed ? 'focused' : ''}`}>{props.label}</label>
                <input
                    className='input-input' 
                    type={props.type} 
                    value={props.value} 
                    onChange={props.onChange}
                    onFocus={() => { setInputed(true); setFocused(true) }}
                    onBlur={() => { props.value.toString().length < 1 && setInputed(false); setFocused(false); }}
                />
            </div>
            {props.action && <div className='input-action' onClick={props.actionFunction}>{props.action}</div> }
        </div>
    )
}