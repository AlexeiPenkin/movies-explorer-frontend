import { React, useState } from 'react';
import { NavigationAuth } from '../NavigationAuth/NavigationAuth';
import { NavigationMovies } from '../NavigationMovies/NavigationMovies';

export const Navigation = () => {
  const [login, setLogin] = useState(true);

  return <>{login ? <NavigationMovies /> : <NavigationAuth />}</>;
};
