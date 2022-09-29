import React from 'react'
import './SaveResponse.css'

function SaveResponse() {
    const [userName, setUserName] = React.useState('');
    const [userMessage, setUserMessage] = React.useState('');
    const userResponse = [];
    const [allResponses, setAllResponses] = React.useState([]);
    const [stopInfiniteLoop, setStopInfiniteLoop] = React.useState(false);

  
    //Getting all the responses
 if(!stopInfiniteLoop) 
    {
        fetch('https://learnig-firebase-21207-default-rtdb.asia-southeast1.firebasedatabase.app/message.json')
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            for(const dataItem in data){
                console.log(
                    data[dataItem].userName,
                    data[dataItem].userMessage
                );
                userResponse.push({userName: data[dataItem].userName, userMessage: data[dataItem].userMessage})
            }
            setAllResponses(userResponse);
        })      
        setStopInfiniteLoop(true);
    }
    const handleUserMessageChange = (event) => {
        setUserMessage(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    //This will prevent our applications  from Reloading
    const handleSubmit = (event) => {

        event.preventDefault();
        console.log('userName: ', userName);
        console.log('userMessage: ', userMessage);

        if(userName === "" || userMessage === ''){
          alert("can't submit empty feedback");
          return;
        }

        //Create(CRUD)
        // inside the fetch we are requesting to "Get" the data.
        // with the help of Get request we get the data from the database.
        fetch('https://learnig-firebase-21207-default-rtdb.asia-southeast1.firebasedatabase.app/message.json',
        //Here we are requesting the Post method
        {
            method:'Post',
            headers:{'Content-Type': 'application/json'},
            //Inside the body we are passing the data/ our whole data is present.
            body: JSON.stringify({
                userName: userName,
                userMessage: userMessage
            })

        }
        )

        setUserName('');
        setUserMessage('');
    }
    


  return (
    <div className="conatiner">
      <div className="container-box">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleUserNameChange} value ={userName} autoComplete ="on"
            />
            <input
              type="text"
              placeholder="Enter your message"
              onChange={handleUserMessageChange} value = {userMessage}
            />
            <button>Submit</button>
          </form>
        </div>

        <div className="reponse-container">
          {allResponses &&
            allResponses.map((item) => {
              return (
                <div className='response-item'>
                  <p className='response-name'>{item.userName}</p>
                  <p className='response-message'>{item.userMessage}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SaveResponse
