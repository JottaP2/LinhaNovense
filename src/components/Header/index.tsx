"use client";

import Image from 'next/image';
import { useState } from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-around items-center py-4">
                    <Image
                        src="/Assets/logos_lateral.png"
                        alt="Transporte IG Logo"
                        width={150}
                        height={50}
                    />
                    <button
                        className="md:hidden flex flex-col space-y-1"
                        onClick={toggleMenu}>
                        <span className={`block w-6 h-0.5 bg-orange-300 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-orange-300 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-orange-300 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Menu Desktop */}
                <nav className="hidden md:block pb-4">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#home" className="text-gray-700 hover:text-blue-600 hover:underline transition-colors">Horários Manhã</a></li>
                        <li><a href="#about" className="text-gray-700 hover:text-blue-600 hover:underline transition-colors">Horários Tarde</a></li>
                        <li><a href="#services" className="text-gray-700 hover:text-blue-600 hover:underline transition-colors">Horários de Sábado</a></li>
                        <li><a href="#contact" className="text-gray-700 hover:text-blue-600 hover:underline transition-colors">Sobre</a></li>
                    </ul>
                </nav>

                {/* Menu Mobile */}
                <nav className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <ul className="py-4 space-y-3 justify-center">
                        <li><a href="#home" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">Horários Manhã</a></li>
                        <li><a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">Horários Tarde</a></li>
                        <li><a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">Horários de Sábado</a></li>
                        <li><a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">Sobre</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;