import React from 'react';

const FormularioError = ({error}) => {
    return ( 
        <div className="my-2 bg-gray-200 border-l-4 border-yellow-500 text-black p-4">
            <p className="font-bold">Error</p>
            <p className="">{error}</p>
        </div>
     );
}
 
export default FormularioError;