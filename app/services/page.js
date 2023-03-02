'use client';
import React, { useState, useEffect } from 'react'
import { addEventOperation, placeBetOperation, resolveBetOperation } from '@/utils/operation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Error from '@/components/Errorpage';




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
      <Error/>
      
      <Footer/>
    </div>
    
  )
}
