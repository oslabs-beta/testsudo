import LandingNav from '../components/LandingNav.jsx';
import Wrapper from '../wrappers/Landing.js';
import LandingCenter from '../components/LandingCenter.jsx';

const Landing = () => {
  return (
    <Wrapper>
      <LandingNav />
      <LandingCenter />
    </Wrapper>
  );
};

export default Landing;
