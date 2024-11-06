import React from 'react';
import THREAD from '../../public/img/thread-logo-w (1).svg';
import USER from '../../public/img/user.svg';
import HOME from '../../public/img/home.svg';
import HEART from '../../public/img/heart-gray.svg';
import SGRAY from '../../public/img/search-gray.svg';
import PLUS from '../../public/img/plus.svg';
import Image from 'next/image';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className='h-screen w-20 flex flex-col items-center pt-2'>
      <Image
        src={THREAD}
        alt='Thread'
        height={30}
        width={30}
        className='m-5'
      />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/home">
        <Image src={HOME} alt='Home' height={25} width={25} className='m-5' />
      </Link>
      <Link href="/search">
        <Image src={SGRAY} alt='Search' height={25} width={25} className='m-5' />
      </Link>
      <Link href="/create">
        <Image src={PLUS} alt='Create' height={22} width={22} className='m-5' />
      </Link>
      <Link href="/notifications">
        <Image src={HEART} alt='Notifications' height={30} width={28} className='m-5' />
      </Link>
      <Link href="/profile">
        <Image src={USER} alt='Profile' height={23} width={23} className='m-5' />
      </Link>
    </div>
  );
}

export default SideBar;
