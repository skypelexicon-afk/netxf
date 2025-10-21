'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaYoutube } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa6';
import { RiLoginCircleFill } from 'react-icons/ri';

const GuestNavbar = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/?login=true', { scroll: false });
    };

    return (
        <>


 {/*<header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-7xl px-6 py-3 bg-white/20 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between">
                <div
                    onClick={() => router.push('/')}
                    className="cursor-pointer flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                    />
                </div> 
                */}


           <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-7xl px-6 py-3 bg-white/20 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between">
               <div
                    onClick={() => router.push('/')}
                    className="cursor-pointer flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Image
                        src="/images/logodi.png"
                        alt="Logo"
                        width={48}
                        height={48}
                    />
 

                
                   
                   
  <h1
  className="hidden sm:block text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AB4918] via-[#FFC857] to-[#AB4918] drop-shadow-lg"
  style={{ fontFamily: "'Great Vibes', cursive" }}
>
  Happy Diwali
</h1>

</div>


                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium text-sm">
                    <button
                        onClick={() => router.push('/all-courses')}
                        //className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
                        className="px-5 py-2 rounded-full bg-[#4A1B09] hover:bg-[#AB4918] text-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"


                    >
                        <FaGraduationCap size={20} className="inline mr-2" />
                        Our Top Courses
                    </button>
                    <button
                        onClick={() =>
                            window.open(
                                'https://www.youtube.com/@TendingtoInfinity',
                                '_blank',
                            )
                        }
                       // className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
                      className="px-5 py-2 rounded-full bg-[#4A1B09] hover:bg-[#AB4918] text-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"

                    >
                        <FaYoutube size={20} className="inline mr-2 " />
                        YouTube Channel
                    </button>
                    <button
                        onClick={handleLogin}
                        className="px-5 py-2 rounded-full bg-neutral-200 text-blue shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
                    >
                        <RiLoginCircleFill size={20} className="inline mr-2" />
                        Sign In
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => router.push('/all-courses')}
                        className="flex flex-col items-center text-xs text-gray-600 hover:text-gray-700 transition cursor-pointer"
                    >
                        <FaGraduationCap size={20} className="mb-1" />
                        <span>Courses</span>
                    </button>
                    <button
                        onClick={() =>
                            window.open(
                                'https://www.youtube.com/@TendingtoInfinity',
                                '_blank',
                            )
                        }
                        className="flex flex-col items-center text-xs text-gray-600 hover:text-gray-700 transition cursor-pointer"
                    >
                        <FaYoutube size={20} className="mb-1 text-red-500" />
                        <span>YouTube</span>
                    </button>
                    <button
                        onClick={handleLogin}
                        className="flex flex-col items-center text-xs text-gray-600 hover:text-gray-700 transition cursor-pointer"
                    >
                        <RiLoginCircleFill size={20} className="mb-1" />
                        <span>Login</span>
                    </button>
                </div>
            </header>
        </>
    );
};

export default GuestNavbar;
