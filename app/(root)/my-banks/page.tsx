import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          type='title'
          title='My Bank Accounts'
          user={loggedIn?.firstName || 'guest'}
          subtext='Effortlessly manage your banking activities.'
        />

        <div className='space-y-4'>
          <h2 className='header-2'>
            Your Cards
          </h2>

          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((account: Account) => (
              <BankCard
                key={account.id}
                account={account}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks