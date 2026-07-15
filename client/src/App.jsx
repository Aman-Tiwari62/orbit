import {useState, useEffect} from 'react'

function App() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
    async function fetchMsg(){
      try{
        console.log("1");
        const response = await fetch("http://localhost:3000/api");
        console.log("2");
        const data = await response.json();
        console.log("3");
        setMsg(data.message);
        console.log("4");
      } catch(error){
        setError("some error occurred.");
        console.log(error);
      } finally{
        setLoading(false);
      }

    }
    fetchMsg();
  }, []);
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>Hello</h1>
      <p>msg: {msg}</p>
      <p>error: {error}</p>
    </div>
  )
}

export default App
