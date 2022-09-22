import React   from "react";
import ReactDOM  from "react-dom/client";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Loginform from "./loginform";
import './App.css';
// import Counter from './component1';
// import Counts from './component2';
import App from "./App"
import Dashboard from "./Dashboard";
import Pages from "./pages";
import Crtacctform from "./createaccountform";
import Profile from "./profile";
import Notification from "./notification";
import Listfriends from "./listoffriends";
import Addfriends from "./addfriends";
import Postext from "./posttext";
import Editprofile from "./editprofile";
import Postimg from "./postimg";
import Poststoryimg from "./poststory";
import Editstoryimg from "./editpoststory";
import Pmsg from "./pmsg";
import Msgbox from "./msgbox";
import Viewpostpics from "./viewpostpics";
import Viewprofilepics from "./viewprofilepicture";
import Replycmt from "./replycmt";
import Edit from "./edit";
let hostname ="http://localhost:2000"
// import reportWebVitals from './reportWebVitals';

// const element =<h1>hello world</h1>

// ReactDOM.render(App,document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="body">
    <Router>
      <Routes>
        <Route exact path="/" element={<Loginform />} />
        <Route path="/signup" element={<Crtacctform />} />
        <Route path="/auth" element={<Pages />}>
          <Route index element={<Profile />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notification" element={<Notification />} />
          <Route path="postimg" element={<Postimg />} />
          <Route path="friends/:id" element={<Listfriends />} />
          <Route path="Editprofile/:id" element={<Editprofile />} />
          <Route path="Addfriends" element={<Addfriends />} />
          <Route path="postext" element={<Postext />} />
          <Route path="pmsg" element={<Pmsg />} />
          <Route path="messages" element={<Msgbox />} />
          <Route path="viewpostpics" element={<Viewpostpics />} />
          <Route path="viewprofilepics" element={<Viewprofilepics />} />
          <Route path="comment/reply" element={<Replycmt />} />
          <Route path="post/edit" element={<Edit />} />
          <Route path="poststory" element={<Poststoryimg />} />
          <Route path="editstory" element={<Editstoryimg />} />
          <Route path="*" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  </div>
);


export { hostname }