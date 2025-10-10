import { LoaderCircle } from 'lucide-react'
import React from 'react'

interface LoadingProps {
  height?: number
}

const Loading: React.FC<LoadingProps> = ({ height = 160 }) => {
  return (
    <div className='flex h-full w-full items-center justify-center py-8'>
      <LoaderCircle
        className="animate-spin aspect-square"
        height={height}
        width={height}
      />
    </div>
  )
}

export default Loading