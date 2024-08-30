import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart';
import PlaidLink from './PlaidLink';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const TotalBalanceBox = async ({ accounts = [], totalBanks, totalCurrentBalance }: TotlaBalanceBoxProps) => {
    const user = await getLoggedInUser();

    return (
        <section className='total-balance'>
            <div className='total-balance-chart'>
                <DoughnutChart accounts={accounts} />
            </div>

            <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-6'>
                    <h2 className='header-2'>
                        Bank Accounts: {totalBanks}
                    </h2>

                    <p className='total-balance-label'>
                        Total Current Balance
                    </p>

                    <div className='total-balance-amount flex-center gap-2'>
                        <AnimatedCounter amount={totalCurrentBalance} />
                    </div>
                </div>

                {user ? (
                    <PlaidLink
                        user={user}
                        src='icons/plus.svg'
                        variant='ghost'
                        type='add-bank'
                    />
                ) : (
                    <h2 className='text-14 font-semibold text-gray-600'>Add Bank</h2>
                )}
            </div>
        </section>
    )
}

export default TotalBalanceBox