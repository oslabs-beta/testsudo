import React from 'react';
import LandingVid from '../assets/landing-vid.mp4';
const LandingCenter = () => {
  return (
    <section className="landing-center">
      <article className="landing-text">
        <h2>Optimize performance. Enhance security. Simplify development.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          perferendis velit cumque quasi, odio veritatis!
        </p>
        <button type="button" className="btn landing-btn">
          Install now
        </button>
      </article>
      <video autoPlay muted loop playsInline>
        <source src={LandingVid} type="video/mp4" />
      </video>
    </section>
  );
};
export default LandingCenter;
