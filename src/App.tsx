import './App.css'

function App() {

  return (
    <>
      <div className="window">
        <header>

          <section className='blue-bar'>
            <img src="/src/assets/connections.ico" className='icon'></img>
            <section className='blue-bar-text'>Valentia Sedano</section>
            </section>

          {/* navbar buttons */}
          <nav className='navbar'>
            <ul>

              <li className='button left-button'><a>
                <img src="/src/assets/Starfield.ico" className='home-icon'></img>
                  <p>Home</p>
              </a></li>
              <li className='button'><a>
                <img src="/src/assets/painting.ico" className='paint-icon'></img>
                <p>Portfolio</p>
              </a></li>
              <li className='button'><a>
                <img src="/src/assets/resume.png" className='resume-icon'></img>
                <p>Resume</p>
              </a></li>
              <li className='button'><a>
                <img src="/src/assets/send.png" className='contact-icon'></img>
                <p>Contact</p>
              </a></li>
              
            </ul>
          </nav>

        </header>

        <div className='content'>
          <p className='banner'>Welcome to my lil corner of the internet!</p>

          {/* BIO SECTION */}
          <div className='bio-section'>
            <img src="/src/assets/mee.jpg" className='bio-image'></img>

            <p className='bio-p'>This site is my homage to vintage web design. </p>
          </div>

          {/* CONTENT FOOTER */}
          {/* use the footer section for the border styling */}
          <div className="footer">
            <div className='footer-section footer-large'></div>
            <div className = 'footer-section footer-small'></div>
            <div className = 'footer-section footer-small'></div>
            <div className = 'footer-section footer-small'></div>
            <div className='footer-section footer-medium'>
              <img src="/src/assets/earth.ico" className='content-footer-icon'></img>
              <p className='footer-section-text'>Internet</p>
            </div>
          </div>

        </div>
        {/* end content section*/}

      </div>
    </>
  )
}

export default App
