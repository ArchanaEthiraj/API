import React, { useState } from "react";

function Task() {
  const [name, setName] = useState("");
  const [nameerr, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailerr, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [passerr, setPassError] = useState("");
  const [password, setPassword] = useState("");
  const [phoneerr, setPhoneError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [datas, setData] = useState([]);
  // var mailformat = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";

  const handleSubmit = () => {
    if (name === "") {
      setNameError("Name should be mandatory");
    } else {
      setNameError("");
    }
    if (email === "") {
      setEmailError("Email is mandatory");
    } else {
      setEmailError("");
    }
    // if(email !== mailformat){
    //   setEmailError("Email format is incorrect")
    // }else{
    //   setEmailError("")
    // }
    if (phone.length > 10) {
      setPhoneError("Phone number exceeds Ten digits");
    } else if (phone.length < 10) {
      setPhoneError("Phone number smal Ten digits");
    } else {
      setPhoneError("");
    }
    if (password === "") {
      setPassError("Password is mandatory");
    } else {
      setPassError("");
    }
    if (email && name && phone && password) {
      setSubmit(true);
    }
    let late = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    fetch("http://54.174.247.198:9000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(late),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  return (
    <div>
      {!submit && (
        <div>
          <div>Register</div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
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
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{emailerr}</span>
          )}
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="pasword"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{passerr}</span>
          )}
          <br />
          <label>Phone Number</label>
          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{phoneerr}</span>
          )}
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {submit && (
        <div>
          <div>register succufutlly:{name}</div>
          {datas?.map((d) => (
            <div key={d.id}>
              <p>{d.message}</p>
              {/* <p>{d.productPrice}</p> */}
            </div>
          ))}
          {/* <div>Email:{email}</div>
          <div>Password:{password}</div>
          <div>Phone:{phone}</div> */}
        </div>
      )}
    </div>
  );
}

export default Task;
