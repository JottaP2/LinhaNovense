import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface Station {
  name: string;
  whatsappLink: string;
}

interface TransportCardProps {
  title: string;
  time: string;
  route: string;
  stations: Station[];
}

function TransportCard({ title, time, route, stations }: TransportCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 max-w-sm">
      <h2 className="font-bold text-gray-800 mb-3">{title}</h2>
      
      <div className="bg-orange-400 text-white rounded-lg p-3 mb-3 text-center">
        <div className="text-xs opacity-80">Saida as</div>
        <div className="text-2xl font-bold">{time}</div>
        <div className="text-xs font-medium">{route}</div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {stations.map((station, index) => (
          <a
            key={index}
            href={station.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-green-600 transition-colors flex items-center gap-1 no-underline"
          >
            <FaWhatsapp size={12} />
            {station.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default TransportCard;