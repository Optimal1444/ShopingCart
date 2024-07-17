import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import '../output.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from './Redux/LoginSlice'
import ShowCart from './ShowCart'
const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Sign up', href: '/register', current: false },
    { name: 'login', href: '/login', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

export default function NavBar() {
    const [signBtnActive,setSignBtnActive]=useState(1)
    const state=useSelector(state=>state.login)
    const [items,setItems]=useState(localStorage.getItem('items'))
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const handleClick=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You will sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Signed out!",
          text: "You have been signed out",
          icon: "success"
        });
        sessionStorage.removeItem('user')
        if(state==0)
          dispatch(handleLogin(1));
        else
          dispatch(handleLogin(0));
      }
    });
  }

  useEffect(()=>{
    setSignBtnActive(sessionStorage.getItem('user'))
    setItems(localStorage.getItem('items'))
  },[state])
  
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-12 w-auto"
                    src="../src/assets/shop-solid.svg"
                    alt="Company logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      (!signBtnActive ||item.name=='Home')&&
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-xl font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3  flex gap-14">
                {signBtnActive&&
                <Link   className='flex gap-1 ' to={('/cart')}>
                <img
                    className=""
                    src="../src/assets/cart-shopping-solid.svg"
                    alt="Company logcart to"
                  />
                  <span className="inline-flex items-center rounded-xl bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-6">{items}</span>
                  </Link>
                }
                  {signBtnActive&&
                    <button onClick={handleClick} className='bg-orange-400 p-2 rounded text-xl' >Sign out</button>
                  }
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                 
                  (!signBtnActive ||item.name=='Home')&&
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

