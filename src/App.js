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
  if (userList.length < 3) {
    alert('You must have at least 3 Secret Santas!')
    return ;
  }

  const idxs = [...Array(userList.length).keys()]
  shuffleArray(idxs);
  const pairs = idxs.map( (_, idx) => [idxs[idx], idxs[(idx+1) % idxs.length]]);
  // listof [[name, email], [name, email]]
  const assignments = pairs.map( (val) => [userList[val[0]], userList[val[1]]]);
  console.log("Assignments:");
  console.log(assignments);

  fetch('https://qf6pwfw20b.execute-api.us-east-1.amazonaws.com/default/SantAssignEmailer',
   {method : 'POST',
   mode: 'no-cors',
   body: JSON.stringify({"pairs" : assignments})});

  onFinish();
};

const Name = ({user}) => (
  <div>
    {user[0]} {user[1]}
  </div>
);

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
    <div style={{width:"100%", minHeight:"100vh", background:"linear-gradient(45deg, #2B6A4D, #A5C1AE)"}}>
    <div className="container col-lg-6 d-flex flex-column justify-content-center text-center align-items-center"> 
      <div>This is SANTAssign</div>

        <div>
          <h4>People: </h4>
          {users.map(( user, idx) =>
            <Name user={user} key={idx}/>)}
        </div>

        <input className = "rounded-pill p-2 px-3 m-2 text-center w-100" id="input_name" type="text" 
      style = {{maxWidth:"500px",}} placeholder="Name"/>
        <input className = "rounded-pill p-2 px-3 m-2 text-center w-100 " id="input_email" type="email" 
      style = {{maxWidth:"500px"}} placeholder="Email"/>
        <br/>
        <button className='rounded-pill btn w-100 m-1' onClick={addUser}
        style = {{maxWidth:"500px",backgroundColor:"#A5C1AE"}}> Add </button>
        <button className='rounded-pill btn w-100 m-1' onClick={ () => assign(users, updateAssigned) }
        style = {{maxWidth:"500px",backgroundColor:"#DF8080"}}> Assign Santas! </button>

    </div>
    </div>

  );
}

export default App;
