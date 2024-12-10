import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Plan from "./components/plans/Plan"
import BrowseWords from './components/words/BrowseWords'
import UserProfile from './components/profile/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<Plan />} />
        <Route path="/browse/words" element={<BrowseWords />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
