// JavaScript source code
import React from 'react';
import './ImageLink.css';

const ImageLink = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'Magiczne wykrywanie twarzy na zdjeciach!'}
            </p>
            <div className='center'>
                <div className='formImageLink center form pa3 br4 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button className='f4 pa2 w-30 ph3 pv2 dib grow white bg-light-purple' onClick={onButtonSubmit}>Szukaj</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLink;