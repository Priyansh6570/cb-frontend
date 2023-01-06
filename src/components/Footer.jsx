import React from 'react';
import '../styles/Footer.scss';
// import { Link } from 'react-router-dom';
import { BsLinkedin } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { TiSocialFacebook, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti';



const Footer = () => {
  return (
    <section className="footer w-full h-[70vh] border-t-2 fi relative sm:hidden">

      <div className="perk-section border-b-2 h-[150px] w-full">
        <div className="perk-container w-[80vw] h-[100%] mx-auto flex items-center gap-16">
          <div className="perk  perk1 ml-6  gap-4 flex w-[300px]">
            <div className="perk-icon w-[70px]">
              <img src={'Images/user.png'} alt="user-icon" />
            </div>
            <div className="perk-text object-contain flex flex-col justify-start  ">
              <h3>Verified Dealers</h3>
              <p>with all Fully certified inventory</p>
            </div>
          </div>
          <div className="perk  perk1 ml-6  gap-4 flex w-[300px]">
            <div className="perk-icon w-[70px]">
              <img src={'Images/car-wash.png'} alt="Track your car Logo" />
            </div>
            <div className="perk-text object-contain flex flex-col justify-start  ">
              <h3>Track your car</h3>
              <p>with your cars service profile</p>
            </div>
          </div>
          <div className="perk  perk1 ml-6  gap-4 flex w-[300px]">
            <div className="perk-icon w-[70px]">
              <img src={'Images/24-hours-support.png'} alt="24/7 icon" />
            </div>
            <div className="perk-text object-contain flex flex-col justify-start  ">
              <h3>24x7 helpline</h3>
              <p>CarsBecho Road side assistance</p>
            </div>
          </div>
          <div className="perk  perk1 ml-6  gap-4 flex w-[500px]">
            <div className="perk-icon w-[60px]">
              <img src={'Images/warranty.png'} alt="warrenty icon" />
            </div>
            <div className="perk-text object-contain flex flex-col justify-start  ">
              <h3>Warranty</h3>
              <p>5 years Insurance upgrading system</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="footer-section border-b-2 w-full h-[280px]">
        <div className="footer-upper-container w-[80vw] h-[100%] mx-auto flex justify-between items-center">
          <div className="footer-upper-left w-[360px] object-contain flex flex-col gap-8 relative top-[-5px] scale-[0.9]">
            <div className="navBrand flex shrink-0 items-center w-[200px] scale-[1.2]">
              <img
                src={'/Images/cbLogo.png'}
                alt="Cars Becho Logo"
                className="brandLogo h-[60px] relative top-[-1px]"
              />
              <img
                src={'/Images/brandName-clearBG.png'}
                alt="Cars Becho Name"
                className="brandName h-[45px] relative top-1"
              />
            </div>
            <div className="get-it-on flex items-center gap-[20px]">
                <a href="#"> <img src={'Images/googlePlay.png'} alt="googlePlay Link" className='h-[42px] w-[130px] scale-[1.2] opacity-[0.9] cursor-pointer' /></a>
              <a href="">  <img src={'Images/appStore.png'} alt="appStore Link" className='h-[52px] w-[140px] scale-[1.2] opacity-[0.9] cursor-pointer' /></a>
            </div>
            <div className="social-links flex flex-col gap-6 justify-start">
                <h3 className='text-lg font-medium'>Follow us</h3>
                <div className="links flex gap-8 text-[#888]">
                <a href="#" target={'_blank'}> <TiSocialFacebook className='scale-[1.9]'/> </a>
                <a href="#" target={'_blank'}> <TiSocialTwitter className='scale-[2]'/> </a>
                <a href="#" target={'_blank'}> <TiSocialYoutube className='scale-[2]'/> </a>
                <a href="#" target={'_blank'}> <RiInstagramFill className='scale-[1.6]'/> </a>
                <a href="#" target={'_blank'}> <BsLinkedin className='scale-[1.4]'/> </a>
                </div>
            </div>
          </div>

          <div className="footer-upper-right flex justify-between w-[60%]">
            <div className="overview flex flex-col gap-8 text-base font-medium">
              <h3>OVERVIEW</h3>
              <ul className='gap-4 flex flex-col text-sm text-[#666]'>
                <li className='cursor-pointer'>About us</li>
                <li className='cursor-pointer'>FAQ</li>
                <li className='cursor-pointer'>Corporate Policies</li>
                <li className='cursor-pointer'>Terms & Conditions</li>
                <li className='cursor-pointer'>Privacy Policy</li>
              </ul>
            </div>
            <div className="contact flex flex-col gap-8 text-base font-medium">
              <h3>CONNECT WITH US</h3>
              <ul className='gap-4 flex flex-col text-sm text-[#666]'>
                <li>1800 200 678 (Toll-Free)</li>
                <li>support@carsbecho.com</li>
                <li className='cursor-pointer'>Customer Care</li>
                <li className='cursor-pointer'>Contact Us</li>
                <li className='cursor-pointer'>Feedback</li>
              </ul>
            </div>
            <div className="others flex flex-col gap-8 text-base font-medium">
              <h3>OTHERS</h3>
              <ul className='gap-4 flex flex-col text-sm text-[#666]'>
                <li className='cursor-pointer'>Blog</li>
                <li className='cursor-pointer'>News</li>
                <li className='cursor-pointer'>Press Release</li>
                <li className='cursor-pointer'>Partners</li>
                <li className='cursor-pointer'>Advertise with us</li>
              </ul>
            </div>
          </div>
         </div>
      </div>

        <div className="footer-bottom-section w-full">
            <div className="footer-copyright-container w-[80%] h-[100%] mx-auto flex justify-center my-auto pt-7">
                <p className='text-[#888] text-xs'>Copyright © 2022 CarsBecho All rights reserved.</p>
            </div>
        </div>
    </section>
  );
};

export default Footer;
