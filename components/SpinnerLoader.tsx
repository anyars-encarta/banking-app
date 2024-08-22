import { Loader } from 'lucide-react'

const SpinnerLoader = ({type}: {type: string}) => {
  return (
    <div className='flex gap-2'>
        <Loader className='animate-spin' /> 
        {type === 'sign-in' ? 'Signing in...' : 'Signing up...'}
    </div>
  )
}

export default SpinnerLoader