<footer>
    <div class="footer-text">
        2023&nbsp;&copy;&nbsp;&nbsp;&nbsp;
        <span>Mohammad M.</span>
      </div>
</footer>
<style>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.25s ease-out, color 0.25s ease-out;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }

  .footer-text {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .footer-text span {
    margin-right: 10px;
  }

  .footer-text svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --text-color: #213547;
      --bg-color: #ffffff;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text-color: rgba(255, 255, 255, 0.87);
      --bg-color: #242424;
    }
  }
  </style>
  