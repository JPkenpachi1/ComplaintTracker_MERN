import React from 'react'

const FormTable = ({handleSubmit,handleChange,rest}) => {
  return (
   <>
   <h1>Update Form </h1>
    <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={rest.name}
              onChange={handleChange}
            
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={rest.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mobile:
            <input
              name="mobile"
              type="number"
              value={rest.mobile}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
       
   </>
  )
}

export default FormTable