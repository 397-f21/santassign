import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  const addUser =  (  ) => {
      const name = document.querySelector("#input_name").value 
      const email = document.querySelector("#input_email").value

      if (name && email) {
        setUsers([...users, [name, email]])
      }


  }
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

    </div>

  );
}

export default App;
