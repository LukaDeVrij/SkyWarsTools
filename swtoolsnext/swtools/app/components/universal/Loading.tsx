import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex h-full w-full items-center justify-center py-8'>
        <LoaderCircle className="animate-spin h-40 w-40" />
    </div>
  )
}

export default Loading