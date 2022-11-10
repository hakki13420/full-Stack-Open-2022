export const Header=({course})=>{
    return(
      <h2>{course}</h2>    
    )
  }
  const Part=({part})=>{
    return(
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  const Content=({parts})=>{
    return(
      <>
        {
          parts.map(part=><Part key={part.id} part={part} />)
        }                  
      </>    
    )
  }
  const Total=({parts})=>{
      const total=parts.reduce((t,p)=>t+p.exercises,0)
      const plural=total>1
    return(
      <strong>total of {total} exercise{plural?"s":""} </strong>
    )
  }

export const Course=({course})=>{
    return(
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />      
        <Total  parts={course.parts} />
      </>
    )
  }
