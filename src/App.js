import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';

import Navbar from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const App = () => {



  const Shop = () => 
  {
    return(
      <div>
      <h1>I am the Shop</h1>
      </div>
    )
  }


  return (
   
    <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path ='shop' element={<Shop/>}/>
      <Route path ='sign-in' element={<SignIn/>}/>
      </Route>
    </Routes>

  );
}

export default App;
