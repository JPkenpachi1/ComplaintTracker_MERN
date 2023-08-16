import React from 'react'

const Card = ({title,description,borderColor}) => {
  const cardStyle={
    borderLeft: `2px solid ${borderColor}`,
  }
  return (
    <>
     <div className="card" style={cardStyle}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    </>
  )
}

export default Card