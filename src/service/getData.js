/*
 * getData.js
 * Copyright (C) 2017  <liubj@wawngsu.com>
 *
 * Distributed under terms of the MIT license.
 */
const baseUrl = 'http://www.easy-mock.com/mock/59c76e49e0dc663341b717dc/example';

export const hotCity = () => fetch(baseUrl + '/hotcity');
export const groupCity = () => fetch(baseUrl + '/groupcity');

export const msiteAddress = () => fetch(baseUrl + '/pois').then(res => res.json());
export const cityGuess = () => fetch(baseUrl + '/cityGuess').then(res => res.json());
export const msiteFoodTypes = () => fetch(baseUrl + '/foodTypes').then(res => res.json());