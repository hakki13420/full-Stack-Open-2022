import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users=({ users }) => {

  return (
    <>
      <h1 className='title-table'>users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default Users