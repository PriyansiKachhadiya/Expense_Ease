import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// In App.jsx
import Header from './Views/components/Header.jsx'
import Footer from "./Views/components/Footer.jsx"
import ExpenseHistory from "./Views/pages/ExpenseHistory/ExpenseHistory.jsx"
import DashBoard from "./Views/pages/DashBoard/DashBoard.jsx"
import ExpenseForm from "./Views/pages/ExpenseForm/ExpenseForm.jsx"
function App() {


  return (
 <Router>
    <Header></Header>
    
    <Routes>
          <Route path='/' element={<DashBoard></DashBoard>}></Route>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/expense-form" element={<ExpenseForm />} />
          <Route path="/expense-history" element={<ExpenseHistory />} />
    </Routes>
    <Footer></Footer>
 </Router>
  )
}

export default App
