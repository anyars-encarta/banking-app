'use client';

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp
                duration={2.75}
                end={amount}
                decimals={2}
                decimal='.' prefix='$'
            />
        </div>
    )
}

export default AnimatedCounter