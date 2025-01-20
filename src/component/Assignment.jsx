import { useState } from 'react'
import TableRow from './TableRow'

const Assignment = () => {
    const [studentData, setStudentData] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    // Query State
    const [query, setQuery] = useState('')

    function formSubmitHandler(e) {
        e.preventDefault()
        setStudentData([...studentData, { firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase(), email: email.toLowerCase() }])
        // Clean state
        setFirstName('')
        setLastName('')
        setEmail('')
    }

    function doesObjectContain(student) {
        const { firstName, lastName, email } = student;
        return [firstName, lastName, email].some(item => item.toLowerCase().includes(query))
    }

    return (
        <div className='py-12 xl:h-screen'>
            <div className='container mx-auto mb-2'>
                <h2 className='text-3xl font-bold text-center mx-auto'>Form</h2>
                <form className='flex flex-col justify-center items-center max-w-[400px] w-full mx-auto' onSubmit={formSubmitHandler}>
                    <div className='flex flex-col gap-6 max-w-[400px] w-full mx-auto'>
                        <div className='flex flex-col '><label className='text-black font-medium text-lg' htmlFor="">First Name</label><input type="text" placeholder='First Name' className='outline-none p-2 mt-3 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={firstName} required onChange={(e) => setFirstName(e.target.value)} /></div>
                        <div className='flex flex-col '><label className='text-black font-medium text-lg' htmlFor="">Last Name</label><input type="text" placeholder='Last Name' className='outline-none p-2 mt-3 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={lastName} required onChange={(e) => setLastName(e.target.value)} /></div>
                        <div className='flex flex-col '><label className='text-black font-medium text-lg' htmlFor="">Email</label><input type="email" placeholder='Email' className='outline-none p-2 mt-3 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto' value={email} required onChange={(e) => setEmail(e.target.value)} /></div>
                    </div>
                    {/* Submit Button */}
                    <button type='submit' className='bg-blue-500 mt-3 px-6 py-2 rounded-lg text-white hover:bg-blue-700 duration-500'>Add</button>
                </form>
                <div className='mt-8 max-w-[400px] mx-auto mb-2'>
                    <h2 className='text-3xl font-bold text-center mx-auto'>Search Input</h2>
                    <input type="search" placeholder='Search first name from list' className='outline-none p-2 mt-4 border border-black rounded-lg text-gray-500 placeholder:text-gray-500 max-w-[400px] w-full mx-auto"' value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <h2 className='text-3xl font-bold text-center mx-auto mb-2'>Save Data</h2>
                <div className='flex flex-col gap-4 max-w-[400px] w-full mx-auto mt-5'>
                    <table className='min-w-full border-collapse text-center mx-auto'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='sm:px-5 px-2 text-nowrap'>First Name</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Last Name</th>
                                <th className='sm:px-5 px-2 text-nowrap'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.filter(doesObjectContain).map(function (student, index) {
                                return <TableRow key={index} index={index} student={student} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Assignment