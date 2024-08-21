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
import { Loader } from 'lucide-react';
import SpinnerLoader from './SpinnerLoader';

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof authFormSchema>) {
        setIsLoading(true);
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setIsLoading(false);
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
                            <CustomFormField
                                control={form.control}
                                label='Email'
                                placeholder='Enter your email'
                                name='email'
                                type='text'
                            />

                            <CustomFormField
                                control={form.control}
                                label='Password'
                                placeholder='Enter your password'
                                name='password'
                                type='password'
                            />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <SpinnerLoader type={type} />
                                            {/* <Loader className='animate-spin' /> 
                                        {type === 'sign-in' ? 'Signing in...' : 'Signing up...'} */}
                                        </>
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