// JavaScript source code
import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, ilosc twarzy ktore znalazles`}
            </div>
            <div className='white f2'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;