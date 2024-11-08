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
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    height: 75%;
  }
`;

export default Wrapper;
