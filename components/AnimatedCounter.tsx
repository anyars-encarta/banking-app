'use client';

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <p className='total-balance-amount flex-center gap-2'>
                <CountUp
                    duration={2.75}
                    end={amount}
                    decimals={2}
                    decimal='.' prefix='$' />
            </p>
        </div>
    )
}

export default AnimatedCounter