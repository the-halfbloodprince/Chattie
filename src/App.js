import {useState, useEffect} from 'react'
import './App.css';
import ChatBot from "./components/chatbot";

function App() {

  const [convWords, setConvWords] = useState({});

  useEffect(() => {
    fetch('/replies.json')
      .then((res)=>res.json())
      .then((data)=>setConvWords(data))
  }, [])

  return (
    <div className="App">
      <ChatBot replies={convWords.reply} triggers={convWords.trigger} alts={convWords.alternative} />
    </div>
  );
}

export default App;
