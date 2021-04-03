import { useState } from "react"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import './styles/chatbot.css'

export default function ChatBot({replies, triggers, alts}){

    //store the user input
    const [userInput, setUserInput] = useState('')
    const [userHistory, setUserHistory] = useState([])
    const [botHistory, setBotHistory] = useState([])
    const handleChange = (e) => setUserInput(e.target.value)

    const generateReply = (triggs, reps, text) => {
        let item, items
        for(let x = 0; x<triggs.length; x++){
            for(let y=0; y<reps.length; y++){
                if(text.includes(triggs[x][y])){
                    items = reps[x];
                    item = items[Math.floor(Math.random()*items.length)]
                }
            }
        }

        return item
    }

    const reply = (userInput) => {
        let botMsg = generateReply(triggers, replies, userInput)

        if(!botMsg)
            botMsg = alts[Math.floor(Math.random()*alts.length)]

        setBotHistory([botMsg, ...botHistory])

    }

    const onKeyUp = (e) => {
        if(e.key==='Enter'){
            setUserHistory([e.target.value, ...userHistory])
            setUserInput('')
            reply(e.target.value)
        }
    }


    return (

        <div className="chatbot-card">
            <header>
               <h1>A Simple Chatbot Application</h1>
               <p>This is a simple chatbot application designed using react. Feel free to go through the code and make something cool</p>
            </header>

            <div className="human-input">
                <InputGroup className="mb-3">
                    <Form.Control 
                        className='mb-2'
                        id="input"
                        type='text'
                        placeholder="Ask me anything..."
                        value={userInput}
                        onChange={handleChange}
                        onKeyPress={onKeyUp}
                    />
                </InputGroup>
            </div>

            <div className="chatbox">
                {userHistory.map((userReply, indx) => (
                    <div className="conversationBox">
                        <div key={`bot-${indx}`} className="bot-reply">
                            <h3>Bot: {botHistory[indx]}</h3>
                        </div>
                        <div key={`user-${indx}`} className="user-input">
                            <h3>You: {userHistory[indx]}</h3>
                        </div>
                    </div>)
                )}
            </div>

        </div>

    )

}