import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { TiSocialFacebook, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti';

const FooterMobile = () => {
  return (
    <section className="footer-mobile hidden sm:flex sm:flex-col">
      <div className="links flex justify-center items-center gap-8 text-[#888]">
        <a href="#" target={'_blank'}>
          {' '}
          <TiSocialFacebook className="scale-[1.9]" />{' '}
        </a>
        <a href="#" target={'_blank'}>
          {' '}
          <TiSocialTwitter className="scale-[2]" />{' '}
        </a>
        <a href="#" target={'_blank'}>
          {' '}
          <TiSocialYoutube className="scale-[2]" />{' '}
        </a>
        <a href="#" target={'_blank'}>
          {' '}
          <RiInstagramFill className="scale-[1.6]" />{' '}
        </a>
        <a href="#" target={'_blank'}>
          {' '}
          <BsLinkedin className="scale-[1.4]" />{' '}
        </a>
      </div>
      <div className="footer-bottom-section w-full">
            <div className="footer-copyright-container w-[80%] h-[100%] mx-auto my-4 flex justify-center pt-7">
                <p className='text-[#888] text-xs'>Copyright © 2022 CarsBecho All rights reserved.</p>
            </div>
        </div>

        <div className="T&C w-full justify-center items-center my-4 flex flex-col gap-8 text-base font-medium">
              <ul className='gap-4 flex text-sm text-[#666]'>
                <li className='cursor-pointer'>Terms & Conditions</li>
                <li className='cursor-pointer'>•</li>
                <li className='cursor-pointer'>Privacy Policy</li>
              </ul>
            </div>
        <div className="contactUs w-full justify-center items-center my-4 flex flex-col gap-8 text-base font-medium">
              <ul className='gap-4 flex text-sm text-[#666]'>
              <li>1800 200 678 (Toll-Free)</li>
                <li className='cursor-pointer'>•</li>
                <li>support@carsbecho.com</li>
              </ul>
            </div>
            <hr />
    </section>
  );
};

export default FooterMobile;
