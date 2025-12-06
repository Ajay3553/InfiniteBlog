import React from 'react';
import HomeFrontImg from '../../assets/homeFront.jpg';

function HomeFront() {
  return (
    // TODO: I can also add short Video by thanking them for visiting my site
    <div className='flex justify-center items-center'> 
        <img src={HomeFrontImg} alt={HomeFrontImg} className='w-full h-[400px] object-cover px-4' />
    </div>
  );
} 

export default HomeFront;
