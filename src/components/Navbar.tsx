"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  Menu, X, Sun, Moon, Compass, BookOpen, Utensils, 
  BrainCircuit, User, LogOut, LayoutDashboard, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { user, darkMode, toggleDarkMode, login, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      login(loginEmail, loginName);
      setShowLoginModal(false);
      setLoginEmail("");
      setLoginName("");
    }
  };

  const navLinks = [
    { name: "Explore Map", href: "/#interactive-map", icon: Compass },
    { name: "Folklore Stories", href: "/stories", icon: BookOpen },
    { name: "Local Food", href: "/food", icon: Utensils },
    { name: "AI Planner", href: "/ai-companion", icon: BrainCircuit },
    { name: "Travel Blog", href: "/blog", icon: BookOpen },
  ];

  const isActive = (href: string) => {
    if (href === "/#interactive-map") return false;
    return pathname === href;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">
                  HI
                </span>
                <span className="font-poppins font-bold text-xl tracking-tight text-primary dark:text-teal-400">
                  Hidden <span className="text-secondary">India</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-primary dark:hover:text-teal-400 ${
                      isActive(link.href)
                        ? "text-primary bg-primary/5 dark:text-teal-400 dark:bg-teal-900/20"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:text-slate-400 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-primary/20 object-cover shadow-sm hover:scale-105 transition-transform"
                    />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowProfileMenu(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 py-1 z-20"
                        >
                          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.role}</p>
                          </div>
                          <Link
                            href="/profile"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          {user.role === "ADMIN" && (
                            <Link
                              href="/admin"
                              onClick={() => setShowProfileMenu(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium ${
                        isActive(link.href)
                          ? "text-primary bg-primary/5 dark:text-teal-400 dark:bg-teal-900/20"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  );
                })}
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full text-center px-4 py-2 mt-2 rounded-lg bg-primary text-white font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Interactive Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 z-10"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 mb-2">
                Join the Adventure
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Login to bookmark hidden spots, write detailed reviews, and maintain your personal travel journal.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Abhinav Singh"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="traveler@hiddenindia.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all mt-2"
                >
                  Enter Hidden India
                </button>
              </form>

              <div className="relative flex items-center justify-center my-5">
                <div className="absolute w-full border-t border-slate-200 dark:border-slate-700" />
                <span className="relative px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase">
                  Or Quick Access
                </span>
              </div>

              <button
                onClick={() => {
                  login("guest@hiddenindia.com", "Rajesh Kumar");
                  setShowLoginModal(false);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors"
              >
                Sign In as Guest
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
