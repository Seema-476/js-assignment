import React, { useState } from 'react';

const Assignment = () => {
    const [search, setSearch] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    const addNumber = (e) => {
        e.preventDefault();
            setIsFormSubmitted(true);
    };

    const formDataValues = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' | ');
    const filteredData = Object.entries(formData).filter(([value]) =>
        value.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='container'>
            <h2 className='text-center text-3xl font-bold pb-8'>Form</h2>
            <form onSubmit={addNumber} className='flex flex-col justify-center items-center gap-2'>
                <input
                    type='text'
                    name='firstname'
                    placeholder='First Name'
                    required
                    className='border border-black rounded-md p-3 max-w-[400px] w-full outline-none'
                    value={formData.firstname} 
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                />
                <input
                    type='text'
                    name='lastname'
                    placeholder='Last Name'
                    required
                    className='border border-black rounded-md p-3 max-w-[400px] w-full outline-none'
                    value={formData.lastname} 
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
                <input
                    type='email'
                    name='email'
                    required
                    placeholder='Email'
                    className='border border-black rounded-md p-3 max-w-[400px] w-full outline-none'
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
                {isFormSubmitted && <p className='flex gap-2 text-center justify-center'>{formDataValues}</p>}
                <button
                    type='submit'
                    className='bg-blue-400 text-white px-6 py-2 rounded-lg mt-4 hover:scale-95 duration-300'
                >
                    Add
                </button>
            </form>
            <div className='text-center mt-8'>
                <input
                    type='search'
                    name='search'
                    placeholder='Search'
                    className='border border-black rounded-md p-3 max-w-[400px] w-full outline-none'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && filteredData.length > 0 && (
                    <div className='mt-4'>
                        <table className='table-auto border-collapse border border-gray-400 mx-auto'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-400 px-4 py-2'>Field</th>
                                    <th className='border border-gray-400 px-4 py-2'>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(([key, value]) => (
                                    <tr key={key}>
                                        <td className='border border-gray-400 px-4 py-2'>{key}</td>
                                        <td className='border border-gray-400 px-4 py-2'>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {search && filteredData.length === 0 && (
                    <p className='text-center text-xl text-red-600'>
                        "{search}" is not in the list.
                    </p>
                )}
           </div>
        </div>
    );
};

export default Assignment;
