"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-[#EA580C] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <Image
                src="/Assets/teste2-1.png"
                alt="Transporte IG Logo"
                width={150}
                height={40}
                className="h-auto"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-white font-medium hover:text-orange-200 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md hover:bg-orange-600/20"
              >
                Contatos
              </a>
              <a
                href="#about"
                className="text-white font-medium hover:text-orange-200 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md hover:bg-orange-600/20"
              >
                Horários Tarde
              </a>
              <a
                href="#contact"
                className="text-white font-medium hover:text-orange-200 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md hover:bg-orange-600/20"
              >
                Sobre
              </a>
              <a
                href="#schedules"
                className="bg-white text-[#EA580C] font-semibold px-6 py-2 rounded-full hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow-md"
              >
                Ver Horários
              </a>
            </nav>

            <button
              className="md:hidden flex flex-col space-y-1 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>

          <nav
            className={`md:hidden transition-all duration-300 ${
              isMenuOpen
                ? "max-h-80 opacity-100 pb-4"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="block text-white hover:text-orange-200 hover:bg-orange-600/20 transition-colors px-4 py-2 rounded-md"
                  onClick={closeMenu}
                >
                  Contatos
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block text-white hover:text-orange-200 hover:bg-orange-600/20 transition-colors px-4 py-2 rounded-md"
                  onClick={closeMenu}
                >
                  Horários Tarde
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-white hover:text-orange-200 hover:bg-orange-600/20 transition-colors px-4 py-2 rounded-md"
                  onClick={closeMenu}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#schedules"
                  className="block bg-white text-[#EA580C] font-semibold text-center mx-4 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors"
                  onClick={closeMenu}
                >
                  Ver Horários
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Header;
