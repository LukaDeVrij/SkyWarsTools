import React from 'react'

const ResponsiveLogo = () => {
  return (
    <div className="flex items-center">
      <img src="/title_750.png" alt="Title" className="h-12 hidden lg:block" />
      <img src="/logo_200.png" alt="Logo" className="h-10 lg:hidden" />
    </div>
  )
}

export default ResponsiveLogo