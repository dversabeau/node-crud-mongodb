import ListEmployees from '../components/ListEmployees';
import './MainLayout.css'
import { useSelector } from 'react-redux';

const MainLayout = () => {

  const list = useSelector(state => state.employees)

  const
    create = 'create',
    read = 'read',
    update = 'update',
    sup = 'delete';

  return (
    <div>
      <ListEmployees status={read} list={list} />
      {/* <ListEmployees status={create} />
      <ListEmployees status={update} />
      <ListEmployees status={sup} /> */}
    </div>
  )
}

export default MainLayout;