//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { putMessage } from '../reducers/notificationReducer'

let timer
const Notification = (props) => {
  // const notification=useSelector(state => {
  //   console.log('state not', state)
  //   return state.notification
  // })
  // console.log('notif    =====',notification)
  // const dispatch=useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom:10
  }
  if(props.notification.time!==0){
    clearTimeout(timer)
    timer=setTimeout(() => {
      props.putMessage({ message:'',time:0 })
    },props.notification.time)
  }
  return (
    <>
      {
        props.notification.message!==''
          ?(
            <div style={style}>
              {props.notification.message}
            </div>
          ):''
      }
    </>
  )
}
const mapStateToProps=(state) => {
  return {
    notification:state.notification
  }
}
const mapDispatchToProps={
  putMessage
}

const connectNotification=connect(mapStateToProps,mapDispatchToProps)(Notification)
export default connectNotification