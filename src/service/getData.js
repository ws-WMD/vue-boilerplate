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

export const shopList = (offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy='', deliveryMode = '', supportIds = '') => {
  let supportStr = '';
  supportIds.forEach(item => {
    if(item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id: restaurantCategoryId,
    'restaurant_category_ids[]': restaurantCategoryIds,
    order_by: orderBy,
    'delivery_mode[]': deliveryMode + supportStr
  };
  return fetch(baseUrl + '/shopping/restaurants', data).then(res => {
    return res.json();
  })
}
