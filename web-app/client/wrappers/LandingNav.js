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
    justify-content: flex-end;
    align-items: center;
  }
  .typewriter {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    height: 2.5rem;
    width: auto;
  }
  .typewriter h1 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.15em solid orange; /* The typewriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.15em; /* Adjust as needed */
    animation: typing 3.5s steps(40, end) forwards,
      blink-caret 0.75s step-end 3 3.5s forwards;
    /* The blink-caret animation will start after 3.5s and blink 3 times, then stay hidden */
    text-transform: lowercase;
    margin-left: 0.25rem;
    color: #f5b23e;
  }
  .logo-link {
    display: flex;
    align-items: center;
  }

  /* The typing effect */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* The typewriter cursor effect */
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
