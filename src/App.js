import { useState } from "react";
import { useEffect, useRef } from "react";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";


function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  
const bottomRef = useRef();
const prevLength = useRef(0);

useEffect(() => {
  if (chat.length > prevLength.current) {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  prevLength.current = chat.length;
}, [chat]);
useEffect(() => {
  const loadHistory = async () => {
    try {
      const res = await fetch(" https://ai-agent-backend-1-d43j.onrender.com/api/history", {
        credentials: "include",
      });

      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }

      const data = await res.json();

      // backend se latest-first aa raha hai → reverse karke normal order
      setChat(data.chats.reverse());
      setIsLoggedIn(true);
    } catch (err) {
      console.log("history error", err);
    }
  };

  loadHistory();
}, []);


  const sendMsg = async () => {
  if (!message) return;

  const newChat = {
    message,
    reply: "typing...",
  };

  setChat(prev => [...prev, newChat]);
  setMessage("");

  try {
    const res = await fetch(" https://ai-agent-backend-1-d43j.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat(prev => {
      const updated = [...prev];
      updated[updated.length - 1].reply = data.reply;
      return updated;
    });

  } catch (err) {
    console.log(err);
  }
};

const Logout = async () => {
  await fetch(" https://ai-agent-backend-1-d43j.onrender.com/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  setIsLoggedIn(false);
  setChat([]);
};
  
return (
  <>
  {!isLoggedIn ? (
        showSignup ? (
          <>
            <Signup setIsLoggedIn={setIsLoggedIn} />
            <p onClick={() => setShowSignup(false)} style={styles.link}>
              Already have account? Login
            </p>
          </>
        ) : (
          <>
            <Login setIsLoggedIn={setIsLoggedIn} />
            <p onClick={() => setShowSignup(true)} style={styles.link}>
              Don't have account? Sign Up
            </p>
          </>
        )
      ) : (
  <>

   <div className="app">
  
  <header className="header">
  <h1>  AI Chat Agent</h1>
   <div className="headerBtn">
     <button className="logout" onClick={Logout}>Logout</button>
   <a href="#"><button className="logout">Setting</button></a></div> 
  </header>

  <div className="chat-container">

    <div className="chat-box">
      {chat.map((item, index) => (
        <div key={index} className="chat-row">
          <div className="chat user">{item.message}</div>
          <div className="chat ai">{item.reply}</div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>

    <div className="input-box">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
         onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();  
      sendMsg();
    }
  }}
      />
      <button onClick={sendMsg}>SEND</button>
    </div>

  </div>
</div>

  </>
)}
</>
);
}
export default App;

const styles = {
  link: {
    color: "#3b82f6",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px"
  }
};