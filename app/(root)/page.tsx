import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = {
    firstName: 'Anyars',
    lastName: 'Yussif',
    email: 'anyars@something.com',
  };

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'guest'}
            subtext='Access & manage your account and transactions efficiently.'
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1452250.35}
          />
        </header>

        RecentTransactions
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 135.89}, {currentBalance: 2135.89}]}
      />
    </section>
  )
}

export default Home