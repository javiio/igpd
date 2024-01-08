import React, { useState, useEffect } from 'react';
import { useTrail, a } from '@react-spring/web';
import styles from './LogoTrail.module.css';

interface TrailProps {
  open: boolean
  children: React.ReactNode
}

const Trail = ({ open, children }: TrailProps) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export const LogoTrail = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setOpen(true), 1200);
    setInterval(() => {
      setOpen(false);
      setTimeout(() => setOpen(true), 1200);
    }, 10000);
  }, []);

  return (
    <div className={styles.container}>
      <Trail open={open}>
        <span className="font-extralight">get</span>
        <span className="font-bold">purpose</span>
        <span className="font-extralight text-right block">done</span>
      </Trail>
    </div>
  );
};
