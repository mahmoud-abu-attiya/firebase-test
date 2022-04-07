import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "./firebase";
import Profile from "./Profile";

function App() {
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <h1>firebase</h1>
      <div>Currently logged in as : {currentUser?.email}</div>
      {!currentUser && 
        <>
          <div className="fields">
            <input ref={emailRef} placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          <button disabled={loading || currentUser != null} onClick={handleSignup}>
            signup
          </button>
          <button disabled={loading || currentUser != null} onClick={handleLogin}>
            log in
          </button>
        </>
      }
     {currentUser &&
      <>
      <Profile />
      <button disabled={loading || currentUser == null} onClick={handleLogout}>
        log out
      </button>
      
      </>
     }
    </div>
  );
}

export default App;
