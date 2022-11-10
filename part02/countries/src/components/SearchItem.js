import React from 'react'

export default function SearchItem({country, setSearch}) {
  const handlClick=()=>{
    setSearch(country.name.common)
  }
  return (
    <div>
      <span key={country.name.common}>
        {country.name.common}
      </span>
      <button onClick={handlClick}>show</button>
    </div>
  )
}
