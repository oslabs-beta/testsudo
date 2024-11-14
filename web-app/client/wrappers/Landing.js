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
    max-width: 1050px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .landing-text {
    width: 400px;
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
    text-transform: none;
  }
  .started-chevron {
    color: var(--white);
    font-size: 1.5rem;
  }
  .get-started-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export default Wrapper;
