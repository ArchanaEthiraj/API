import React, { useState } from "react";
import belt from '../src/assests/belt.jpg'
import laptop from '../src/assests/laptop.jpg'
import phone from '../src/assests/phone.jpg'
import shoe from '../src/assests/shoe.jpg'
import slipper from '../src/assests/slipper.jpg'
import spoon from '../src/assests/spoon.jpg'
import watch from '../src/assests/watch.jpg'

function Login() {
  const [userName, setName] = useState("");
  const [nameerr, setNameError] = useState("");
  const [passerr, setPassError] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [datas, setData] = useState([]);
  const [image,setImage] = useState[
    {
    id:1,
    img:laptop
  },
  {
    id:2,
    img:phone
  },
  {
    id:3,
    img:shoe
  },
  {
    id:4,
    img:slipper
  },
  {
    id:5,
    img:spoon
  },
{
  id:6,
  img:watch
},
{
  id:7,
  img:belt
}];
  

  const handleSubmit = () => {
    if (userName === "") {
      setNameError("Name should be mandatory");
    } else {
      setNameError("");
    }
    if (password === "") {
      setPassError("Password is mandatory");
    } else {
      setPassError("");
    }
    
    let late = {
      username: userName,
      password: password,
    };
    
    fetch("http://54.174.247.198:9000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(late),
    })
      .then((response) => response.json())
      .then((data) =>{
        if (data?.message === "password does not match") {
          alert("password")
        }else if(data?.message === "no user found"){
          alert("no user found")

        }else{
          setSubmit(true)

        }
       
        localStorage.setItem("Authorization", `Bearer ${data.data.token}`)
      }
        
      );

    fetch("http://54.174.247.198:9000/api/listproduct", {
      method: "GET",
      headers:{  "Authorization": localStorage.getItem("Authorization")},
    }).then(x=>x.json())
      .then((data)=> setData(
        data?.result
        ))
      
  };
  

  return (
    <div>
      {!submit && (
        <div>
          <div>Login</div>
          <label>User Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            name="username"
          ></input>
          {nameerr === "" ? null : (
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {nameerr}
            </span>
          )}
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{passerr}</span>
          )}
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {submit && (
        <div>
          <div>Welcome:{userName}</div>
          {datas?.map((d) => (
            <div key={d.id}>
              <p>{d.productsName}</p>
              <p>{d.productPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Login;
