import React, {useState} from 'react';

import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const [username, setUserName] = useState("");
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);

  const handleChange = (e) => {
    setUserName(e.target.value);
  }

  const searchClick = async (e) => {
    e.preventDefault();
    if(!username.trim()) {
      setInputError('username required');
      setShowData(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: not user`);
      }

      const result = await response.json();
      setData(result);
      setShowData(true);
      setInputError('');
      
      
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
   <div>
   <div className='container-fluid mt-3 d-flex flex-column justify-content-center p-5 mt-5' style={{width: "550px", boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)"}}>
<h2 className='text-center text-bg-primary p-5 mb-4'>github user search</h2>
     <div className='d-flex gap-2'>
     <input type='text' className='form-control rounded-0' value={username} onChange={handleChange} placeholder='enter name' /> 
       <button type='submit' className='btn btn-primary rounded-0' onClick={searchClick}>search</button>
     </div>
     {inputError && <p className='text-center text-danger mt-1 position-relative' style={{fontSize: '12px', left: '-130px'}}>{inputError}</p>}
   </div>
     {loading && (
     <div className='text-center mt-3'>
     <div className='spinner-container'>
     <div className='spinner'></div>
     </div>
     </div>
     )}
     {error && (
     <p className='text-center text-danger mt-3'>{error}</p>
     )}
     {showData && !loading && !error && (
     <div className='container-fluid mt-3 d-flex p-3 gap-5 mt-5' style={{width: '550px', boxShadow: '0 0 50px rgba(0, 0, 0, 0.2)'}}>
       <img src={data.avatar_url} alt='User Avatar' width={200} />
       <div>
       <p><b>name:</b>{data.name}</p>
         <p><b>location:</b>{data.location}</p>
         <p><b>followers:</b>{data.followers}</p>
         <p><b>repositories:</b>{data.public_repos}</p>
         <a href={data.html_url} target='_blank' rel='noopener noreferrer'>
         <button className='btn btn-primary rounded-0'>view profile</button>
         </a>
       </div>
     </div>
     )}
   </div>
  )
  
}
export default App;