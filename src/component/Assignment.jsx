import { useState, useEffect } from 'react';
import TableRow from './TableRow';
import { FORM_FIELDS } from '../utils/helper';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const Assignment = () => {
    const [studentData, setStudentData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: ''
    });
    const [query, setQuery] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('studentData');
        if (storedData) {
            setStudentData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('studentData', JSON.stringify(studentData));
    }, [studentData]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required!`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const newStudent = {
            firstName: formData.firstName.toLowerCase(),
            lastName: formData.lastName.toLowerCase(),
            email: formData.email.toLowerCase(),
            address: formData.address.toLowerCase(),
        };

        setStudentData([...studentData, newStudent]);

        emailjs
            .send(
                'service_ix25dr9',
                'template_ohy6dpx',
                formData,
                'v5JFU5BhK_V5R8A-v'
            )
            .then((response) => {
                console.log('Email sent successfully:', response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Form submitted and email sent.',
                    showConfirmButton: true,
                });
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to send email. Please try again later.',
                    showConfirmButton: true,
                });
            });

        setFormData({ firstName: '', lastName: '', email: '', address: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: '' });
    };

    const handleDelete = (index) => {
        const updatedData = studentData.filter((_, i) => i !== index);
        setStudentData(updatedData);
        localStorage.setItem('studentData', JSON.stringify(updatedData));
    };

    const doesObjectContain = (student) => {
        return Object.values(student).some((value) =>
            value.toLowerCase().includes(query.toLowerCase())
        );
    };

    return (
        <div className='py-9 xl:h-screen'>
            <div className='container mx-auto mb-2'>
                <div className='max-w-[400px] mb-2 flex items-center gap-2'>
                    <p>Search :</p>
                    <input
                        type="search"
                        placeholder='Search first name from list...'
                        className='outline-none p-1 border border-black rounded-lg text-sm text-gray-500 placeholder:text-gray-500 max-w-[200px] w-full mx-auto'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <h2 className='text-3xl font-bold text-center mx-auto'>Form</h2>
                <form className='flex flex-col justify-center items-center max-w-[400px] w-full mx-auto' onSubmit={formSubmitHandler}>
                    <div className='flex flex-col gap-4 max-w-[400px] w-full mx-auto'>
                        {FORM_FIELDS.map((field) => (
                            <div key={field.name} className="flex flex-col">
                                <label className="text-black font-medium text-lg">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    className={`outline-none p-2 mt-2 border ${errors[field.name] ? 'border-red-500' : 'border-black'} rounded-lg text-gray-500 placeholder:text-gray-500`}
                                    value={formData[field.name]}
                                    onChange={handleInputChange}
                                />
                                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                            </div>
                        ))}
                    </div>

                    <button type='submit' className='bg-blue-500 mt-3 px-6 py-2 rounded-lg text-white hover:bg-blue-700 duration-500'>
                        Add
                    </button>
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
                            {studentData.filter(doesObjectContain).map((student, index) => (
                                <TableRow key={index} index={index} student={student} handleDelete={() => handleDelete(index)} />
                            ))}
                        </tbody>
                    </table>
                    <button className='bg-blue-500 mt-4 px-6 py-2 rounded-lg text-white hover:bg-blue-700 duration-500 mx-auto'>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default Assignment;