'use client';
import React, { useState, useEffect } from 'react'
import { addEventOperation, placeBetOperation, resolveBetOperation } from '@/utils/operation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';




export default function Service() {

  const [loadingAddEvent, setLoadingAddEevnt] = useState(false);
  const [loadingPlaceBet, setLoadingPlaceBet] = useState(false);
  const [loadingResolveBet, setLoadingResolveBet] = useState(false);

  const onAddEvent = async () => {
    try {
      setLoadingAddEevnt(true);
      await addEventOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }

    setLoadingAddEevnt(false);
  };

  const onPlaceBet = async () => {
    try {
      setLoadingPlaceBet(true);
      await placeBetOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }

    setLoadingPlaceBet(false);
  };

  const onResolveBet = async () => {
    try {
      setLoadingResolveBet(true);
      await resolveBetOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }

    setLoadingResolveBet(false);
  };



  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 items-center justify-center  gap-4 ">
        <div className="container   flex flex-col gap-4 p-6 justify-center items-center lg:flex-row">
          <button onClick={() => onAddEvent()} className={loadingAddEvent === false ? "btn btn-info" : "btn btn-info loading"}>Add Event</button>

          <button onClick={() => onPlaceBet()} className={loadingPlaceBet === false ? "btn btn-success" : "btn btn-success loading"}>Place Bet</button>
          <button onClick={() => onResolveBet()} className={loadingResolveBet === false ? "btn btn-warning" : "btn btn-warning loading"}>Resolve Bet</button>

        </div>
        
      </div>

      
      <Footer/>
    </div>
    
  )
}
