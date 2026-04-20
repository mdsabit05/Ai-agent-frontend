import React, { useState } from "react";

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signup = async () => {

    const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    email,
    password,
    name,
  }),
});
    if (res.ok) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div style={styles.box}>
      <h2>Sign Up</h2>

      <input
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={styles.input}
/>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={signup} style={styles.button}>Sign Up</button>
    </div>
  );
}

export default Signup;

const styles = {
  box: {
    maxWidth: "300px",
    margin: " 180px  auto 20px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "white",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "#334155",
    color: "white",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
  link: {
    textAlign: "center",
    color: "#3b82f6",
    cursor: "pointer",
    marginTop: "10px",
  },
};