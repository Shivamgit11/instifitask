import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentDashboard from "./components/PaymentDashboard"

function App() {
  


  
  return (
   <div>
    <div className="text-black" >Payment Dashboard</div>
    <PaymentDashboard />
   </div>
  );
}

export default App;
