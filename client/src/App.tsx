import axios from 'axios';
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  const getMessage = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/send-message/');
      setTitle(res.data.message);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <button onClick={getMessage}>Make Request</button>
      <p>{title}</p>
    </>
  );
}

export default App;