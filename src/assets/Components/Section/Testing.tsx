// @ts-nocheck
import { useState, useEffect } from "react";
import { useStore } from './store' 

function Testing() {
  const x = useStore((state) => state.x)

  
  useEffect(() => {
  }, []);
  
  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <p>{x}</p>
    </div>
  );
}

export default Testing;