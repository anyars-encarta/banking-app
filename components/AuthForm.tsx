'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import CustomFormField from './CustomFormField';
import { authFormSchema } from '@/lib/utils';
import SpinnerLoader from './SpinnerLoader';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signUp } from '@/lib/actions/user.actions';
import SignIn from '@/app/(auth)/sign-in/page';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        console.log(isLoading)
        try {
            // Sign-up with appwrite & create a plaid link token
            if (type === 'sign-up') {
                const newUser = await signUp(data);

                setUser(newUser)
            }

            if (type === 'sign-in') {
                const response = SignIn({
                    email: data.email,
                    password: data.password,
                })

                if (response) router.push('/');
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='cursor-pointer flex items-center gap-1'>
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='Horizon logo'
                    />

                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}

                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>

            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomFormField
                                            control={form.control}
                                            label='First Name'
                                            placeholder='Enter your first name'
                                            name='firstName'
                                            type='text'
                                            id='firstName'
                                        />

                                        <CustomFormField
                                            control={form.control}
                                            label='Last Name'
                                            placeholder='Enter your last name'
                                            name='lastName'
                                            type='text'
                                            id='lastName'
                                        />
                                    </div>

                                    <CustomFormField
                                        control={form.control}
                                        label='Address'
                                        placeholder='Enter your address'
                                        name='address1'
                                        type='text'
                                        id='address1'
                                    />

                                    <CustomFormField
                                        control={form.control}
                                        label='City'
                                        placeholder='Enter your city'
                                        name='city'
                                        type='text'
                                        id='city'
                                    />

                                    <div className='flex gap-4'>
                                        <CustomFormField
                                            control={form.control}
                                            label='State'
                                            placeholder='ex: NY'
                                            name='state'
                                            type='text'
                                            id='state'
                                        />

                                        <CustomFormField
                                            control={form.control}
                                            label='Postal Code'
                                            placeholder='ex: 11101'
                                            name='postalCode'
                                            type='text'
                                            id='postalCode'
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <CustomFormField
                                            control={form.control}
                                            label='Date of Birth'
                                            placeholder='yyyy-mm-dd'
                                            name='dateOfBirth'
                                            type='text'
                                            id='dateOfBirth'
                                        />

                                        <CustomFormField
                                            control={form.control}
                                            label='SSN'
                                            placeholder='ex: 1234'
                                            name='ssn'
                                            type='text'
                                            id='ssn'
                                        />
                                    </div>
                                </>
                            )}

                            <CustomFormField
                                control={form.control}
                                label='Email'
                                placeholder='Enter your email'
                                name='email'
                                type='email'
                                id='email'
                            />

                            <CustomFormField
                                control={form.control}
                                label='Password'
                                placeholder='Enter your password'
                                name='password'
                                type='password'
                                id='password'
                            />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {isLoading ? (
                                        <SpinnerLoader type={type} />
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type === 'sign-in' ? "Don't have an account? " : "Already have an account?"}</p>

                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm