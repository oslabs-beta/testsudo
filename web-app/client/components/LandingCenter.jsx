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
        <a
          href="https://www.npmjs.com/package/@testsudo/testsudo"
          className="btn landing-btn"
          target="_blank"
        >
          Install now
        </a>
      </article>
      <video autoPlay muted loop playsInline>
        <source src={LandingVid} type="video/mp4" />
      </video>
    </section>
  );
};
export default LandingCenter;
