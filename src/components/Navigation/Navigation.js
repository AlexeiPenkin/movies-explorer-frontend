import { React } from 'react';
import { NavigationAuth } from '../NavigationAuth/NavigationAuth';
import { NavigationMovies } from '../NavigationMovies/NavigationMovies';

export const Navigation = ({ login }) => {

  return <>{login ? <NavigationMovies /> : <NavigationAuth />}</>;
};
