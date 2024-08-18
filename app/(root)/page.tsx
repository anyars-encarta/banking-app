import HeaderBox from '@/components/HeaderBox'

const Home = () => {
  const loggedIn = { firstName: 'Anyars' };

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
        </header>
      </div>
    </section>
  )
}

export default Home