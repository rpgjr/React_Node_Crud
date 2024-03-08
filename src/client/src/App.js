import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
