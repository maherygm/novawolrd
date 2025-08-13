import React, { useState } from "react"
import { Link, NavLink } from 'react-router-dom';

// Style importation
import './mainfooter.scss'

// Assets Importaion
// import logo from '../../../../assets/image/logo/LogoSiriusWhite.png';
// componets importation

function MainFooter() {
  const [termModal, setTermModal] = useState(false);
  const [politicModal, setPoliticModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

  const openTermModal = () => {
    setTermModal(true);
  };

  const closeTermModal = () => {
    setTermModal(false);
  };

  const openPoliticModal = () => {
    setPoliticModal(true);
  };

  const closePoliticTermModal = () => {
    setPoliticModal(false);
  };

  const openVideo = () => {
    setVideoModal(true);
  };

  const closevideo = () => {
    setVideoModal(false);
  };

  return (
    <div className='foot mt-14'>
        <div className='foot_content'>
            <div className='leftside'>
              {/* <img src={logo} alt="user-icon" width='200px' /> */}
              <h1 className="text-[40px] text-white font-syne">Sentinel</h1>
              <p>Sentinel est une solution innovante de gestion d’épidémies, conçue pour fournir des données en temps réel, analyser les tendances et anticiper la propagation des maladies. Grâce à une interface intuitive et des outils avancés, restez toujours un pas en avance face aux crises sanitaires.</p>
              
            </div>

            <div className='rightside'>
              <div className='part'>
                  <h5 className="text-white">Raccourcis</h5>
                  <div className='raccourci'>
                    <a href='#banner' className={"rac_btn"}>Accueil</a>
                    <a href='#about' className={"rac_btn"}>A propos</a>
                    <a href='#solution' className={"rac_btn"}>Solutions</a>
                    <a href='#school' className={"rac_btn"}>Ecoles</a>
                    <a href='#contact' className={"rac_btn"}>Contact</a>
                  </div>
                  
              </div>

              <div className='part'>
              <h5 className='text-white'>Accès</h5>
                  <div className='raccourci'>
                    <Link to={"/login"} className={"rac_btn"}>Se connecter</Link>
                  </div>

                <h5 className='text-white'>Utiles</h5>
                  <div className='raccourci'>
                    <Link to={"/dashboard/course"} className={"rac_btn"}>Simulation</Link>
                    <Link to={"/dashboard/rpofile"} className={"rac_btn"}>profile</Link>
                    <Link to={"/dashboard/bag"} className={"rac_btn"}>IA Space</Link>
                  </div>
                  
              </div>

              <div className='part'>
                <h5 className='text-white'>Extensions</h5>
                    <div className='raccourci'>
                      <Link to={"/librairies/intro"}  className={"rac_btn"}>Bibliothèque numérique</Link>
                      <Link to={"/game/studio"} className={"rac_btn"}>Espace Jeux</Link>
                    </div>
                <h5 className='text-white'>Utiles</h5>
                    <div className='raccourci'>
                      <Link  to={"/help"} className={"rac_btn"}>Aide</Link>
                      <span className={"rac_btn"} onClick={() => openVideo()} >Video presentation</span>
                    </div>
              </div>
            </div>
        </div>

        <div className="foot-shorcut">

        </div>

        <div className="foot-bottom py-3 border-t-1 border-slate-500 w-[95%] flex justify-between text-white">
          <small className='jurid_message text-white'>copyright©2024 Sentinel. by Supernova Team</small>
          <div className="politic-link text-white">
            <span onClick={()=> openTermModal()} className='juridic-btn'>Termes et conditions d'utilisations</span>
          </div>
        </div>
    </div>
  )
} 

export default MainFooter