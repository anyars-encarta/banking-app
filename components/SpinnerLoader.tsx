import { Loader2 } from 'lucide-react'
import React from 'react'

const SpinnerLoader = ({type}: {type: string}) => {
  return (
    <div>
        <Loader2 className='animate-spin' /> 
        {type === 'sign-in' ? 'Signing in...' : 'Signing up...'}
    </div>
  )
}

export default SpinnerLoader