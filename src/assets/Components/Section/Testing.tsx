// @ts-nocheck
//Ignore, this is for testing code






import { all } from "axios";
import { use, useEffect } from "react";

function Testing() {

const data = [
  { scores: [10, 20] },
  { scores: [5, 15, 25] }
];





useEffect(() => {
for(let i = 0; i < data.length; i++){
  console.log(i)
}
}, [])

  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">

    </div>
  );
}

export default Testing;