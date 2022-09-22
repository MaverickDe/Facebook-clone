
import "./editprofile.css";

let Editprofile = () => {

    return (
      <div style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
        <h1 style={{ color: "red" }}>YEMA</h1>
        <h1>Edit Profile</h1>
        <form style={{ width: "100%", height: "fit-content" }}>
          <div>
            <label htmlFor="Fisrtname">Firstname</label>
            <input className="edt" placeholder="Firstname" name="Firstname" />
          </div>
          <div>
            <label htmlFor="lastname">lastname</label>
            <input className="edt" placeholder="lastname" name="lastname" />
          </div>
          <div>
            <label htmlFor="dob">dob</label>
            <input className="edt" placeholder="dob" name="dob" />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input className="edt" placeholder="email" name="email" />
          </div>
          <div>
            <button style={{ width: "50px" }}>save</button>
          </div>
        </form>
      </div>
    );
    
}


export default Editprofile