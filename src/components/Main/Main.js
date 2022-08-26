import React from 'react';
import { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Footer } from '../Footer/Footer';
import './Main.css';

export const Main = ({ login }) => {

  return (
    <>
      <Header login={ login }/>
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