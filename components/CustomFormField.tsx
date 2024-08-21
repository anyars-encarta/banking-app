import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

interface CustomFormField {
    control: Control<z.infer<typeof authFormSchema>>,
    label: string,
    placeholder: string,
    name: string,
    type: string
};

const CustomFormField = ({ control, label, placeholder, name, type}: CustomFormField) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }: any) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>

                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input placeholder={placeholder}
                                className='input-class'
                                {...field}
                                type={type}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomFormField