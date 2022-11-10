
export default function Filter({setSearch, filtredData}) {    

    const handlEnter=(e)=>{
        if(e.keyCode===13){     
         setSearch(e.target.value)
         filtredData()
        }
       }
  return (
    <>
      filter shown with <input type="text" onKeyDown={handlEnter} />
    </>
  )
}
