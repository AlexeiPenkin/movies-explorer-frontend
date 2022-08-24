import React from 'react';
import { HeaderHomePage } from '../HeaderHomePage/HeaderHomePage';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Footer } from '../Footer/Footer';
import './Main.css';

export const Main = () => {

  return (
    <>
      <HeaderHomePage />
      <main className='main__components'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  )
}