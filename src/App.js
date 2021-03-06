import './App.scss';
import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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

  const priceLimit = document.querySelector('#input_limit').value

  const body = {"pairs" : assignments}
  if(priceLimit < 0){
    alert("Price limit must be greater than or equal to 0");
    return;
  }
  if (priceLimit) body["pricelimit"] = priceLimit;

  fetch('https://qf6pwfw20b.execute-api.us-east-1.amazonaws.com/default/SantAssignEmailer',
   {method : 'POST',
   mode: 'no-cors',
   body: JSON.stringify(body)});

  onFinish();
};

const Name = ({user, handleDelete}) => (
  <div className = "rounded card m-2" style={{minWidth:"200px", backgroundColor:"white"}}>
    <IoCloseSharp style={{position:'absolute', right:0, top:0}} onClick={handleDelete}/>
    <div className = 'p-1'>
    <h4 className = 'card-title m-0'>{user[0]}</h4>
    <div className = 'card-text'>{user[1]}</div>
    </div>  
  </div>
);


function App() {
  const [users, setUsers] = useState([]);
  const [assigned, setAssigned] = useState(false);

  const handleDelete = (deleteIdx) => {
    if (window.confirm(`Are you sure you want to remove ${users[deleteIdx][0]} <${users[deleteIdx][1]}>?`)){
      setUsers(users.filter((val, idx) => idx !== deleteIdx))  
    }
  }

  const addUser =  (  ) => {
      const name = document.querySelector("#input_name").value 
      const email = document.querySelector("#input_email").value

      if (!name || !email) {
        alert("Please enter a Name and Email");
        return;
      }
      
      if(!validateEmail(email)){
        alert(`${email} is not a valid Email`);
        return;
      }

      setUsers([...users, [name, email]])
      document.querySelector("#input_name").value = "";
      document.querySelector("#input_email").value = "";  
  }
      
  const updateAssigned = () => setAssigned(true);

  return (
    <div>
      {[...Array(45).keys()].map(idx=> <div key={idx} className="snow"></div>)}
      
      {/*<div style={{zIndex: 1, background: 'rgba(0, 0, 0, 0)', position: 'absolute', left: 0, top: 0, width: '100%', height: '100vh'}}>*/}
        
      <div data-cy='logo' className="container col-lg-6 d-flex flex-column justify-content-center text-center align-items-center" style={{paddingBottom: 'calc(100vw / 3.77)'}}> 
        <h1 className="display-1 fw-bold pt-2" style={{color:'#56a367', filter:'none'}}>
          <img src="/santaicon.png" style={{height: '1em', marginBottom: '.3em', marginRight: '.1em'}} alt='icon'/>
          Santa<span style={{color:'white'}}>ssign</span>
          <img src="/santaicon.png" style={{height: '1em', marginBottom: '.3em', marginLeft: '.1em'}} alt='icon'/>
        </h1>
      
          {(assigned) ? (
            <h4 style={{color:'white'}}>
              The assignments have been sent to everyone's email!!!
            </h4>
          ) : (
            <>
              <div className = 'd-flex flex-wrap justify-content-center'>
                
                {users.map(( user, idx) =>
                  <Name user={user} handleDelete={() => handleDelete(idx)} key={idx}/>)}
              </div>

              <input className = "rounded-pill p-2 px-3 m-2 text-center w-100 glow" 
                  id="input_name" 
                  type="text" 
                  style = {{maxWidth:"500px",zIndex:1}} 
                  placeholder="Name" />
              <input className = "rounded-pill p-2 px-3 m-2 text-center w-100 glow" 
                  id="input_email"
                  type="email" 
                  style = {{maxWidth:"500px",zIndex:1}}
                  placeholder="Email" />
              <button className='rounded-pill w-100 m-1 pulse' 
                  onClick={addUser}
                  style = {{maxWidth:"500px",backgroundColor:"#A5C1AE",zIndex:1}} > 
                Add 
              </button>

              <br/>

              <input className = "rounded-pill p-2 px-3 m-2 text-center w-100 glow"
                  id="input_limit"
                  type="number" 
                  style = {{ maxWidth:"500px",zIndex:1}}
                  min = {0}
                  placeholder="Price Limit (optional)" />
              <button
                  className='rounded-pill w-100 m-1 pulse' 
                  onClick={ () => assign(users, updateAssigned) }
                  style = {{maxWidth:"500px",backgroundColor:"#DF8080",zIndex:1}}>
                Assign Santas! 
              </button>
            </>
          )}
      </div>
      
      <img src="https://www.pngkit.com/png/full/857-8570261_bg-footer-snow.png" alt="Footer" className='glow' style={{position: 'fixed', bottom: 0, left: 0, width:"100vw"}}/>
    </div>

  );
}

export default App;

//
