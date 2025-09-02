import React from 'react'

export const NavButton = ({ text, onClickHandler }) => {
  return (
    <div
      onClick={onClickHandler}
      className="cursor-pointer hover:text-blue-600 transition-colors"
    >
      {text}
    </div>
  )
}
