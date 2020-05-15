// JavaScript source code
import React from 'react';

const ImageLink = () => {
    return (
        <div>
            <p className='f3'>
                {'Wykrywacz twarzy'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' />
                    <button className='f4 pa2 w-30 ph3 pv2 dib grow white bg-light-purple'>Szukaj</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLink;