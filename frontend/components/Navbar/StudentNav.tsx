'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StudentProfileDropdown from '../UserButton/StudentUB';
import Link from 'next/link';
import { FaCartPlus, FaGraduationCap } from 'react-icons/fa6';

// type UserRole = 'student' | 'educator' | null;

const StudentNavbar = () => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
             {/* <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-7xl px-6 py-3 bg-white/20 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between">
             
               <div
                    onClick={() => router.push('/student')}
                    className="cursor-pointer flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                    />
                </div>
                          */ }


 <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-7xl px-6 py-3 bg-white/20 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between">
               <div
                    onClick={() => router.push('/student')}
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

               <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium text-sm">
                 
                    <Link
                        href="/all-courses"
                      //  className="hover:text-gray-800 transition cursor-pointer"
                       className=" transition cursor-pointer hover:text-yellow-700  text-yellow-600"
                    >
                        All Courses
                    </Link>
                    <Link
                        href="/student/dashboard/my-enrollments"
                      //  className="hover:text-gray-800 transition cursor-pointer"
                      className=" transition cursor-pointer hover:text-yellow-700 text-yellow-600"
                    >
                        My Enrollments
                    </Link>
                    <Link
                        href="/student/cart"
                       // className="hover:text-gray-800 transition cursor-pointer"
                       className="hover:text-yellow-700 transition cursor-pointer   text-yellow-600"
                    >
                        My Cart
                    </Link>
                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            <Image
                                src="/images/user_icon.svg"
                                alt="User"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </nav>
                {isDropdownOpen && (
                    <div className="absolute top-10 right-0 z-50">
                        <StudentProfileDropdown
                            onClose={() => setIsDropdownOpen(false)}
                        />
                    </div>
                )}
                <div className="md:hidden flex items-center gap-4">
                    <Link
                        href="/student/cart"
                        className="flex flex-col items-center text-xs text-yellow-600 hover:text-yellow-700 transition cursor-pointer"
                    >
                        <FaCartPlus size={20} className="mb-1" />
                        <span> Cart</span>
                    </Link>
                    <Link
                        href="/all-courses"
                        className="flex flex-col items-center text-xs text-yellow-600 hover:text-yellow-700 transition cursor-pointer"
                    >
                        <FaGraduationCap size={20} className="mb-1" />
                        <span>Courses</span>
                    </Link>
                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            <Image
                                src="/images/user_icon.svg"
                                alt="User"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default StudentNavbar;
