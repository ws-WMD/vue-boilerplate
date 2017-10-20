import Shop from '@/modules/shop'
import Search from '@/modules/search'
import ComfirmOrder from '@/modules/comfirmOrder'
import Remark from '@/modules/comfirmOrder/remark'
import CheckTicket from '@/modules/comfirmOrder/checkTicket'
import AddAddress from '@/modules/comfirmOrder/addAddress'
import NewAddress from '@/modules/comfirmOrder/newAddress'

export default [
  {
    path: '/',
    component: Shop
  },{
  	path: '/search',
  	component: Search
  },{
  	path: '/comfirmOrder',
  	component: ComfirmOrder
  },{
    path: '/comfirmOrder/remark',
    component: Remark
  },{
    path: '/comfirmOrder/checkTicket',
    component: CheckTicket
  },{
    path: '/comfirmOrder/addAddress',
    component: AddAddress
  },{
    path: '/comfirmOrder/newAddress',
    component: NewAddress
  }

];