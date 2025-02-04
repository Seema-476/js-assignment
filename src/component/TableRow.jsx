import React from 'react';

const TableRow = ({ student: { firstName, lastName, email, address }, index , handleDelete }) => {
    return (
        <tr>
            <td>{index+1}</td>
            <td className="sm:px-5 px-2">{firstName}</td>
            <td className="sm:px-5 px-2">{lastName}</td>
            <td className="sm:px-5 px-2">{email}</td>
            <td className="sm:px-5 px-2">{address}</td>
            <td><button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>
        </tr>
    );
};

export default TableRow;