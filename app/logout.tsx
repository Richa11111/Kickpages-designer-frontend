"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import from 'next/router'
import { LogOut } from "lucide-react";
import Cookies from 'js-cookie';
import Link from 'next/link'; // Correctly imported
import { useDispatch, useSelector } from "react-redux";
import { LogoutUserAction } from '@/redux/signin/signInActions';

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform the logout operation
    localStorage.removeItem('token');
    Cookies.remove('token');
    // Redirect to the login page after logout

    dispatch(LogoutUserAction());
    router.push('/login');

  };

  return (
    <Link href="/login" onClick={handleLogout} style={{ cursor: 'pointer' }}>
      <LogOut />
    </Link>
  );
}