import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { RTCTLogo } from "../Logos/Logos";
import { BarChartBig } from "lucide-react";
import { useAuth } from "../../auth/authContext";

export default function NavbarComponent() {
  const { user, logout } = useAuth();
const isAuthenticated = !!user;// ✅ JWT-based auth
  const navigate = useNavigate();

  return (
    <Navbar className="h-20">
      {/* Brand */}
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <RTCTLogo />
          <span className="font-bold text-2xl hidden sm:block">RTCT</span>
        </Link>
      </NavbarBrand>

      {/* Desktop Links */}
      <NavbarContent className="hidden md:flex gap-6">
        <Link to="/dashboard" className="text-xl font-medium">
          Dashboard
        </Link>
        <Link to="/chat" className="text-xl font-medium">
          Community
        </Link>
      </NavbarContent>

      {/* Mobile Menu */}
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly className="md:hidden">
            <BarChartBig />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => navigate("/dashboard")}>
            Dashboard
          </DropdownItem>
          <DropdownItem onClick={() => navigate("/chat")}>
            Community
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Right Side */}
      <NavbarContent justify="end">
        {user ? (
          // ✅ AUTHENTICATED
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                name={user.email?.[0]?.toUpperCase()}
                className="cursor-pointer bg-indigo-600 text-white"
              />
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem>
                <Tooltip content={user.email}>
                  <div>
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-medium truncate">{user.email}</p>
                  </div>
                </Tooltip>
              </DropdownItem>

              <DropdownItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownItem>

              <DropdownItem color="danger" onClick={logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          // ❌ NOT AUTHENTICATED
          <>
            <NavbarItem>
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}