import React from 'react';

const TableRow = ({ student: { firstName, lastName, email }, index }) => {
    return (
        <tr>
            <td>{index}</td>
            <td className="sm:px-5 px-2">{firstName}</td>
            <td className="sm:px-5 px-2">{lastName}</td>
            <td className="sm:px-5 px-2">{email}</td>
        </tr>
    );
};

export default TableRow;