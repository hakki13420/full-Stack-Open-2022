//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { doFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    props.doFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps={
  doFilter
}

const connectFilter=connect(null, mapDispatchToProps)(Filter)
export default connectFilter