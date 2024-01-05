import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import { AuthForm } from '~auth';

export default () => {
  const [vantaEffect, setVantaEffect] = useState(null);

  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(HALO({
        THREE,
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        baseColor: 0x9109b1,
        backgroundColor: 0xd195c,
        xOffset: -0.07,
        size: 1,
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>
      
      <div ref={myRef} className="h-screen flex">
        <div className="flex-1">
          <div className="text-white font-extralight text-6xl pt-4 ml-12">
            gpd
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-end mr-32">
          <AuthForm />
        </div>
      </div>
    </React.Fragment>
  );
};
