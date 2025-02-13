/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import user_emailjs from '@emailjs/browser'
import { useForm, SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import codigoimg03 from '/Img/proyectos-img/coding03.jpg'


// esta parte valida la informacion que el usuario pone ejemplo verifica que sea string lo que uno escribio
const formSchema = z.object({
    user_name: z.string().min(2),
    user_email: z.string().min(2),
    message: z.string().min(2),

})

// esta parte verifica si lo que nosotros ponemos en el formulario es string y eso 
interface FormValues {
    user_name: string,
    user_email: string,
    message: string,

}


export const Contacto = () => {


    const [value, setValue] = useState<FormValues>({
        user_name: "",
        user_email: "",
        message: "",
    })


    const { formState: { errors }, handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    const showAlert = () => {
        Swal.fire('Message sent successfully', 'Thank you for contacting us', 'success')
    }
    const errorAlert = () => {
        Swal.fire('You need to fill out the form', ':)', 'error')
    }



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        console.log(value, setValue)
        console.log(data);


        if (!form.current) {
            console.error('Form is not available.');
            return;
        }


        if (Object.keys(errors).length === 0) {
            // No errors, show success alert
            showAlert();

            user_emailjs
                .sendForm('service_n6abozc', 'template_a61uahn', form.current as HTMLFormElement, {
                    publicKey: 'Ylw0HGG5WgP5iNpjZ',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );
        } else {
            errorAlert()
            // There are errors in the form, do not proceed with sending user_email
            console.log('Form has errors. Please correct them before submitting.');
        }
    };

    const form = useRef<HTMLFormElement>(null);


    const contactMethods = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ,
            contact: "justingomezcoello@gmail.com"
        },


        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ,
            contact: "Quito , Ecuador"
        },
    ]





    return (
        <main className="flex mt-20 overflow-hidden bg-gray-900 ">

            <div className="flex-1 hidden lg:block m-9">
                <img src= {codigoimg03} className="object-cover w-full h-screen" />
            </div>

            <div className="flex-1 py-12 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
                <div className="flex-1 max-w-lg px-4 mx-auto text-white">
                    <div>
                        <h3 className="text-4xl font-semibold text-white sm:text-5xl">
                        Get in touch
                        </h3>
                        <p className="mt-3 sm:text-xl">
                        If you have any questions or doubts or want information, just fill out the form and we will get in touch.
                        </p>



                        <div>
                            <ul className="flex flex-wrap items-center mt-6 gap-x-10 gap-y-6">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-3 sm:text-xl">
                                            <div className="flex-none text-gray-400 ">
                                                {item.icon}
                                            </div>
                                            <p>{item.contact}</p>
                                        </li>
                                    ))
                                }
                            </ul>

                            <div className='iconos '>
                                <ul className='flex gap-3 mt-6 me-auto ml-9'>

                                    <NavLink to="https://github.com/JustinGomezcoello" target="_blank" className="inline-block" >
                                        <img src="https://www.svgrepo.com/show/94698/github.svg" className="" width="30" height="30" alt="gt" />
                                    </NavLink>

                                    <NavLink to="https://www.linkedin.com/in/justin-gomezcoello/" target="_blank" className="inline-block" >
                                        <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="in" />
                                    </NavLink>



                                </ul>
                            </div>

                        </div>

                    </div>


                    <form
                        ref={form}
                        onSubmit={handleSubmit(onSubmit)}

                        className="mt-12 space-y-5 lg:pb-12"
                    >
                        <div>
                            <label className="font-medium sm:text-xl">
                                Full Name
                            </label>


                            <input
                                placeholder='Full Name '
                                {...register("user_name", { required: true, minLength: 2 })}

                                className="w-full px-3 py-2 mt-2 text-white bg-transparent border rounded-lg shadow-sm focus:border-gray-800"
                            />

                        </div>
                        <div>
                            <label className="font-medium sm:text-xl">
                                Email
                            </label>

                            <input
                                type='email'
                                placeholder='Email'
                                {...register("user_email", { required: true, minLength: 2 })}
                                className="w-full px-3 py-2 mt-2 text-white bg-transparent border rounded-lg shadow-sm focus:border-gray-800"
                            />


                        </div>


                        <div>
                            <label className="font-medium sm:text-xl">

                                Message
                            </label>

                            <textarea
                                placeholder='Write your questions or doubts'
                                {...register("message", { required: true, minLength: 2 })}
                                className="w-full px-3 py-2 mt-2 bg-transparent border rounded-lg shadow-sm outline-none appearance-none resize-none h-36 focus:border-gray-800" name='message'></textarea>
                        </div>


                        <button

                            className="w-full px-4 py-2 font-medium text-white duration-150 bg-blue-400 rounded-lg sm:text-xl hover:bg-gray-700 active:bg-gray-900"
                            type="submit"
                            value='Send'
                        >
                            Send
                        </button>



                    </form>
                </div>
            </div>
        </main>


    )
}



