const Header = (props) => <h1>{props.course.name}</h1>
const Part = (props) => <p> {props.name} {props.exercises}</p>
const Content = (props) => {
  return (
    <div>
        {props.parts.map(part => <Part name={part.name} exercises={part.exercises} key = {part.id}/>)}
    </div>
  )
}
const Course = ({course}) => {
  let sum = 0
  for (let part of course.parts) {
      sum += part.exercises
  }
  return(
    <div>
      <Header course={course} />
      <Content parts= {course.parts} />
      <Total sum = {sum}/>    
    </div>
  )
}
const Total = (props) => <p><b>Total of {props.sum} exercises</b></p>
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ]
  }

  return (
    <div>
      <Course course = {course}/>
    </div>
  )
}

export default App