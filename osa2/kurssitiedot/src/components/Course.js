const Header = ({name}) => <h2>{name}</h2>
const Part = ({part}) => <p> {part.name} {part.exercises}</p>
const Total = ({parts}) => <p><b>Total of {parts.map(part => part.exercises).reduce((prev,cur) => prev + cur,0)} exercises</b></p>
const Content = ({parts}) => {
  return (
    <div>
        {parts.map(part => <Part part = {part} key = {part.id}/>)}
    </div>
  )
}
const Course = ({course}) => {

    return(
      <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts}/>    
      </div>
    )
  }

export default Course