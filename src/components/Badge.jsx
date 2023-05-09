import React from 'react'

const Badge = () => {
  return (
    <span className="badge flex gap-2 items-center bg-[#ffa2a253] rounded-2xl p-1">
              <img src={'/Images/cbLogo.png'} alt="carsbecho Logo" className='w-[16px]' />
              <span className="badge_text text-sm font-bold text-[#ee3131] uppercase">Verified</span>
    </span>
  )
}

export default Badge