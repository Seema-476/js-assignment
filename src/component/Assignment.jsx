import { useState,useEffect } from 'react'
import TableRow from './TableRow'

const Assignment = () => {
    // const [filteredData,setFilteredData] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    // Query State
    const [query, setQuery] = useState('')
    // storage data 
    useEffect(() => {
        const storedData = localStorage.getItem('studentData');
        if (storedData) {
            const prevData = JSON.parse(storedData);
            setStudentData(prevData);
            // setFilteredData(prevData);
        }
    }, []);

    useEffect(() => {
        if (studentData.length > 0) {
            localStorage.setItem('studentData', JSON.stringify(studentData));
        }
    }, [studentData]);

    function formSubmitHandler(e) {
        e.preventDefault()
        setStudentData([...studentData, { firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase(), email: email.toLowerCase(), address: address.toLowerCase() }])
        // Clean state
        setFirstName('')
        setLastName('')
        setEmail('')
        setAddress('')
    }
    function handleDelete(index) {
        const updatedData = studentData.filter((_, i) => i !== index);
        setStudentData(updatedData);
    }

    function doesObjectContain(student) {
        const { firstName, lastName, email,address } = student;
        return [firstName, lastName, email,address].some(item => item.toLowerCase().includes(query))
    }

    return (
        <div className='py-9 xl:h-screen'>
            <div className='container mx-auto mb-2'>
                <div className='max-w-[400px] mb-2 flex items-center gap-2'>
                    <p>Search :</p>
                    <input type="search" placeholder='Search first name from list...' className='outline-none p-1 border border-black rounded-lg text-sm text-gray-500 placeholder:text-gray-500 max-w-[200px] w-full mx-auto"' value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <h2 className='text-3xl font-bold text-center mx-auto'>Form</h2>
                <form className='flex flex-col justify-center items-center max-w-[400px] w-full mx-auto' onSubmit={formSubmitHandler}>
                    <div className='flex flex-col gap-4 max-w-[400px] w-full mx-auto'>
                        <div className='flex flex-col'><label className='text-black font-medium text-lg' htmlFor="">First Name</label><input type="text" placeholder='First Name' className='outline-none p-2 mt-2 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={firstName} required onChange={(e) => setFirstName(e.target.value)} /></div>
                        <div className='flex flex-col'><label className='text-black font-medium text-lg' htmlFor="">Last Name</label><input type="text" placeholder='Last Name' className='outline-none p-2 mt-2 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={lastName} required onChange={(e) => setLastName(e.target.value)} /></div>
                        <div className='flex flex-col'><label className='text-black font-medium text-lg' htmlFor="">Email</label><input type="email" placeholder='Email' className='outline-none p-2 mt-2 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={email} required onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className='flex flex-col'><label className='text-black font-medium text-lg' htmlFor="">Address</label><input type="text" placeholder='Address' className='outline-none p-2 mt-2 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={address} required onChange={(e) => setAddress(e.target.value)} /></div>
                    </div>
                    {/* Submit Button */}
                    <button type='submit' className='bg-blue-500 mt-3 px-6 py-2 rounded-lg text-white hover:bg-blue-700 duration-500'>Add</button>
                </form>
                <h2 className='text-3xl font-bold text-center mx-auto mb-2'>Saved Data</h2>
                <div className='flex flex-col gap-4 max-w-[400px] w-full mx-auto mt-5 max-sm:overflow-auto'>
                    <table className='min-w-full border-collapse text-center mx-auto '>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='sm:px-5 px-2 text-nowrap'>First Name</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Last Name</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Email</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Address</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.filter(doesObjectContain).map(function (student, index) {
                                return <TableRow key={index} index={index} student={student} handleDelete={() => handleDelete(index)} />
                            })}
                        </tbody>
                    </table>
                    <button className='bg-blue-500 mt-4 px-6 py-2 rounded-lg text-white hover:bg-blue-700 duration-500 mx-auto'>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Assignment