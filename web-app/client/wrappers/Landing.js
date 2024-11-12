import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  .landing-center {
    margin-top: 2rem;
    height: 475px;
    width: 75%;
    max-width: 970px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .landing-text {
    width: 250px;
  }
  .landing-text h2 {
    color: var(--white);
  }
  .landing-text p {
    color: var(--grey);
    margin-bottom: 1rem;
  }
  .landing-center video {
    height: 300px;
    border-radius: var(--nav-border-radius);
  }
  .landing-btn {
    padding: 10px 15px;
  }
`;

export default Wrapper;
