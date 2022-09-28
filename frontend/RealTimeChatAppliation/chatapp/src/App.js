import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dotchatcomp from './components/dotchatcomp/Dotchatcomp';
import LogPage from './components/loginpage/LogPage';
import Proteced from './components/protected/Proteced';
import Profilesection from './components/profilesection/profilesection';
import Signup from './components/signup/Signup';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dotchatcomp/>}>
            <Route path='login' element={<LogPage/>}/>
            <Route path='signup' element={<Signup/>}/>
          </Route> 
          <Route path='/profilesection' element={<Proteced Component={Profilesection} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

