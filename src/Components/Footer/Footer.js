import React from 'react';
import './Footer.css';

const Footer = props => {
  return (
    <footer>
      <div>Copyright &copy; 2019 Mikkel Theiss Westermann</div>
      <div className='footerContact'>
        <p><strong>Contact:</strong></p>
        <a href='https://mikkelwestermann.github.io/Portfolio/'>Mikkel Westermann</a>
        <a href='https://www.linkedin.com/in/mikkel-westermann/'>LinkedIn</a>
        <a href='https://github.com/MikkelWestermann'>GitHub</a>
        <a href='https://twitter.com/MTWestermann?lang=en'>Twitter</a>
      </div>
    </footer>
  );
}

export default Footer;
