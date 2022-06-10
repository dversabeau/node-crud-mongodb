import './ListEmployees.css';

const ListEmployees = (props) => {

  const { status, list } = props;
  console.log('list', list)

  return (
    <div>
    <p>{list[0].name}</p>
      {list.lenght > 0 && list.map((employee, index) => {
        <div key={index}>
          <p>{employee.name}</p>
        </div>
      })}
    </div>
  )

}

export default ListEmployees;