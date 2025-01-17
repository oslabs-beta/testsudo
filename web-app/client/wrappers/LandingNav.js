import styled from 'styled-components';

const Wrapper = styled.nav`
  height: 5.625rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .nav-center {
    width: 95%;
    max-width: var(--max-width-nav);
    height: 75%;
    border-radius: var(--nav-border-radius);
    background: var(--nav-bg-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .nav-btn-container {
    width: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    /* border: 1px solid red; */
  }
  .typewriter {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    height: 4rem;
    width: auto;
  }
  .github-logo-landing {
    color: var(--white);
    font-size: 2rem;
    margin-top: 5px;
  }
  .typewriter h1 {
    overflow: hidden;
    border-right: 0.15em solid orange;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: typing 3.5s steps(40, end) forwards,
      blink-caret 0.75s step-end 3 3.5s forwards;
    text-transform: lowercase;
    margin-left: 0.25rem;
    color: #f5b23e;
  }
  .logo-link {
    display: flex;
    align-items: center;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    0%,
    100% {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
`;

export default Wrapper;
