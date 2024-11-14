import { FaChevronRight } from 'react-icons/fa';
import LandingVid from '../assets/landing-vid.mp4';
const LandingCenter = () => {
  return (
    <section className="landing-center">
      <article className="landing-text">
        <h2>Optimize performance. Enhance security. Simplify development.</h2>
        <p>
          Testsudo is your all-in-one testing suite for optimizing frontend,
          backend, and security performance. With a single CLI command, Testsudo
          runs comprehensive tests and provides a detailed dashboard for each
          project, giving you insights on every page and path. Say goodbye to
          juggling multiple tools - Testsudo streamlines your workflow, so you
          can focus on what matters most: building high-quality applications.
        </p>
        <div className="get-started-container">
          <a
            href="https://www.npmjs.com/package/@testsudo/testsudo"
            className="btn landing-btn"
            target="_blank"
          >
            Get started on npm
          </a>
          <FaChevronRight className="started-chevron" />
        </div>
      </article>
      <video autoPlay muted loop playsInline>
        <source src={LandingVid} type="video/mp4" />
      </video>
    </section>
  );
};
export default LandingCenter;
