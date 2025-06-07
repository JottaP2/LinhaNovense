"use client";

import Image from 'next/image';
import TransportCard from '../ui/TransportCard';
import { useState, useEffect } from 'react';

const stations = [
  { name: "Gonçalo", whatsappLink: "https://wa.me/5511999999999" },
  { name: "Higor", whatsappLink: "https://wa.me/5511888888888" },
  { name: "Zé Doninha", whatsappLink: "https://wa.me/5511777777777" }
];

const transportSchedule = {
  manha: [
    {
      id: "001",
      title: "Transporte 001 - Segunda à Sexta",
      time: "06:10",
      route: "Pontos: Rua da Igreja e comercio da cidade",
    },
    {
      id: "002",
      title: "Transporte 002 - Segunda à Sexta",
      time: "07:30",
      route: "Pontos: Centro e Terminal Rodoviário",
    }
  ],
  tarde: [
    {
      id: "004",
      title: "Transporte 004 - Segunda à Sexta",
      time: "14:00",
      route: "Pontos: Centro e Terminal Rodoviário",
    },
    {
      id: "005",
      title: "Transporte 005 - Segunda à Sexta",
      time: "15:30",
      route: "Pontos: Shopping e Universidade",
    }
  ],
  sabado: [
    {
      id: "003",
      title: "Transporte 003 - Sábado",
      time: "08:00",
      route: "Pontos: Shopping e Universidade",
    }
  ]
};

type BusStatus = 'waiting' | 'departing' | 'in_transit' | 'finished';

interface BusStatusInfo {
  id: string;
  status: BusStatus;
  nextDeparture?: string;
}

function Section3() {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [busStatuses, setBusStatuses] = useState<BusStatusInfo[]>([]);

    const toggleDrawer = (period: string) => {
        setActiveDrawer(activeDrawer === period ? null : period);
    };

    const periods = [
        { key: 'manha', label: 'Manhã', icon: '🌅', color: 'bg-[#FFA300]' },
        { key: 'tarde', label: 'Tarde', icon: '☀️', color: 'bg-[#FFA300]' },
        { key: 'sabado', label: 'Sábado', icon: '📅', color: 'bg-[#FFA300]' }
    ];

    const timeToMinutes = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const getCurrentTimeInMinutes = (): number => {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    };

    const getBusStatus = (departureTime: string, busId: string): BusStatus => {
        const currentMinutes = getCurrentTimeInMinutes();
        const departureMinutes = timeToMinutes(departureTime);
        const timeDiff = currentMinutes - departureMinutes;

        if (timeDiff < 0) {
            return 'waiting'; // Ainda não chegou a hora
        } else if (timeDiff >= 0 && timeDiff < 5) {
            return 'departing'; // Está saindo (0-5 minutos)
        } else if (timeDiff >= 5 && timeDiff < 60) {
            return 'in_transit'; // Em trânsito (5-60 minutos)
        } else {
            return 'finished'; // Já terminou a viagem
        }
    };

    const getStatusText = (status: BusStatus): { text: string; color: string; icon: string } => {
        switch (status) {
            case 'waiting':
                return { text: 'Aguardando', color: 'text-gray-600', icon: '⏳' };
            case 'departing':
                return { text: 'Saindo agora', color: 'text-yellow-600', icon: '🚌' };
            case 'in_transit':
                return { text: 'Em trânsito', color: 'text-green-600', icon: '🚍' };
            case 'finished':
                return { text: 'Finalizado', color: 'text-gray-400', icon: '✅' };
        }
    };

    const getNextBus = (): { time: string; period: string } | null => {
        const currentMinutes = getCurrentTimeInMinutes();
        const currentDay = new Date().getDay();
        const isWeekend = currentDay === 0 || currentDay === 6;

        let allBuses: { time: string; period: string }[] = [];

        // Adiciona ônibus de manhã e tarde se for dia útil
        if (!isWeekend || currentDay === 6) {
            if (currentDay === 6) {
                // Sábado
                allBuses = [...allBuses, ...transportSchedule.sabado.map(bus => ({ time: bus.time, period: 'sábado' }))];
            } else {
                // Segunda a sexta
                allBuses = [
                    ...allBuses,
                    ...transportSchedule.manha.map(bus => ({ time: bus.time, period: 'manhã' })),
                    ...transportSchedule.tarde.map(bus => ({ time: bus.time, period: 'tarde' }))
                ];
            }
        }

        // Encontra o próximo ônibus
        const nextBuses = allBuses
            .filter(bus => timeToMinutes(bus.time) > currentMinutes)
            .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

        return nextBuses[0] || null;
    };

    // Atualiza o tempo a cada minuto
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Atualiza a cada minuto

        return () => clearInterval(timer);
    }, []);

    // Atualiza os status dos ônibus
    useEffect(() => {
        const updateBusStatuses = () => {
            const allBuses = [
                ...transportSchedule.manha,
                ...transportSchedule.tarde,
                ...transportSchedule.sabado
            ];

            const statuses = allBuses.map(bus => ({
                id: bus.id,
                status: getBusStatus(bus.time, bus.id)
            }));

            setBusStatuses(statuses);
        };

        updateBusStatuses();
        const timer = setInterval(updateBusStatuses, 60000); // Atualiza a cada minuto

        return () => clearInterval(timer);
    }, [currentTime]);

    const nextBus = getNextBus();

    return (
        <main className="flex flex-col items-center justify-center p-6 lg:p-10">
            <h1 className="font-bold text-[#FFA300] text-xl lg:text-3xl mb-6">Horários de Transporte</h1>
            
            {/* Status em Tempo Real */}
            <div className="w-full max-w-4xl mb-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    🕐 Status em Tempo Real
                </h2>
                <div className="text-center">
                    <p className="text-lg text-gray-600 mb-2">
                        Agora são <span className="font-bold text-[#FFA300]">
                            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </p>
                    {nextBus ? (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-blue-800">
                                🚌 Próximo ônibus: {nextBus.time} ({nextBus.period})
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-lg text-gray-600">
                                Não há mais ônibus hoje
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <article className='flex items-center justify-center gap-6 lg:gap-12 p-4 mb-8 bg-white rounded-lg shadow-sm'>
                <div className="flex items-center gap-3">
                    <Image
                        src="/Assets/Onibus.svg"
                        alt="Ônibus"
                        width={40}
                        height={40}
                        className="lg:w-12 lg:h-12"
                        priority
                    />
                    <div className='flex flex-col text-center'>
                        <span className='text-xs font-light text-gray-600'>Saída</span>
                        <h2 className='font-bold text-sm lg:text-base'>Igreja Nova</h2>
                    </div>
                </div>

                <Image
                    src="/Assets/Route.svg"
                    alt="Rota"
                    width={40}
                    height={40}
                    className="lg:w-12 lg:h-12"
                    priority
                />

                <div className="flex items-center gap-3">
                    <div className='flex flex-col text-center'>
                        <span className='text-xs font-light text-gray-600'>Destino</span>
                        <h2 className='font-bold text-sm lg:text-base'>Penedo</h2>
                    </div>
                </div>
            </article>

            <div className="w-full max-w-4xl space-y-4">
                {periods.map((period) => (
                    <div key={period.key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Header da Gaveta */}
                        <button
                            onClick={() => toggleDrawer(period.key)}
                            className={`w-full p-4 flex items-center justify-between ${period.color} text-white hover:opacity-90 transition-opacity`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{period.icon}</span>
                                <h2 className="font-bold text-lg">{period.label}</h2>
                            </div>
                            <div className={`transform transition-transform duration-200 ${
                                activeDrawer === period.key ? 'rotate-180' : ''
                            }`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {/* Conteúdo da Gaveta */}
                        <div className={`transition-all duration-300 ease-in-out ${
                            activeDrawer === period.key 
                                ? 'max-h-[1000px] opacity-100' 
                                : 'max-h-0 opacity-0'
                        } overflow-hidden`}>
                            <div className="p-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {transportSchedule[period.key as keyof typeof transportSchedule].map((transport) => {
                                        const busStatus = busStatuses.find(status => status.id === transport.id);
                                        const statusInfo = busStatus ? getStatusText(busStatus.status) : null;
                                        
                                        return (
                                            <div key={transport.id} className="relative">
                                                <TransportCard
                                                    title={transport.title}
                                                    time={transport.time}
                                                    route={transport.route}
                                                    stations={stations}
                                                />
                                                {statusInfo && (
                                                    <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium bg-white border-2 border-gray-100 shadow-sm ${statusInfo.color} z-10`}>
                                                        <span className="mr-1 text-xs">{statusInfo.icon}</span>
                                                        <span className="text-xs">{statusInfo.text}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
};

export default Section3;