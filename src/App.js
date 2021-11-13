import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const assign = (userList, onFinish) => {
  const idxs = [...Array(userList.length).keys()]
  shuffleArray(idxs);
  const pairs = idxs.map( (_, idx) => [idxs[idx], idxs[(idx+1) % idxs.length]]);
  const assignments = pairs.map( (val) => [userList[val[0]], userList[val[1]]]);
  console.log("Assignments:");
  console.log(assignments);
  onFinish();
};

function App() {
  const [users, setUsers] = useState([]);
  const [assigned, setAssigned] = useState(false);

  const addUser =  (  ) => {
      const name = document.querySelector("#input_name").value 
      const email = document.querySelector("#input_email").value

      if (name && email) {
        setUsers([...users, [name, email]])
        document.querySelector("#input_name").value = "";
        document.querySelector("#input_email").value = "";
      }
  }

  const updateAssigned = () => setAssigned(true);

  console.log(users)
  return (
    <div className="container col-6  d-flex flex-column justify-content-center"> 
      <div>This is SANTAssign</div>

        <div>
          <h4>People: </h4>
          {users.map(( user, idx) =>
             <div key={idx}>
               {user[0]} {user[1]}
              </div>)}
        </div>

        <input id="input_name" type="text" />
        <input id="input_email" type="email" />
        <br/>
        <button className='btn btn-primary' onClick={addUser}> Add </button>
        <button className='btn btn-primary' onClick={ () => assign(users, updateAssigned) }> Assign Santas! </button>

    </div>

  );
}

export default App;
