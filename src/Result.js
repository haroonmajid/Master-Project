import React, { useEffect, useState } from 'react';

function Result({ score, total }) {  
  const [text, setText] = useState("")
  useEffect(()=>{
    if (score > 5 ) {
      setText("Congrats")
    }else{
      setText("Sorry")
    }
  },[])
  return (
    <div className="flex flex-col gap-5 justify-center h-screen items-center text-purple-600 bg-purple-100">
      <h2 className='text-[48px]'>{text}</h2>
      <p className='text-[32px]'>Your score is {score} out of {total}.</p>
      <button className='rounded-md text-[24px] py-2 bg-purple-600 px-5 hover:bg-purple-700 text-purple-100' onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
}

export default Result;
