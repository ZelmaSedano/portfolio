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
          <div className='bio-section'>
            <img src="/src/assets/mee.jpg" className='bio-image'></img>

            <p className='bio-p'>This site is my homage to vintage web design. </p>
          </div>

        </div>
        {/* ^ content section*/}

      </div>
    </>
  )
}

export default App
