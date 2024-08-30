'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const PlaidLink = ({ user, variant, src, type }: PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async() => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken)
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user
        })

        router.push('/');
    }, [user])
    
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }
    
    const { open, ready } = usePlaidLink(config)

    return (
        <>
            {variant === 'primary' ? (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className='plaidlink-primary'
                >
                    Connect Bank
                </Button>
            ) : variant === 'ghost' ? (
                <Button onClick={() => open()} variant='ghost' className={`${type === 'add-bank' ? 'flex gap-2 text-14 font-semibold text-gray-600' : 'plaidlink-ghost'}`}>
                    <Image src={src || ''} alt='add bank' width={24} height={24}/>
                    <p className={cn(`hidden text-[16px] font-semibold xl:block`, {"text-blue-600": type === 'add-bank'})}>Add Bank</p>
                </Button>
            ) : (
                <Button onClick={() => open()} className='plaidlink-default'>
                    <Image src={src || ''} alt='connect bank' width={24} height={24}/>
                    <p className='text-[16px] font-semibold text-black-2'>Connect Bank</p>
                </Button>
            )}
        </>
    )
}

export default PlaidLink