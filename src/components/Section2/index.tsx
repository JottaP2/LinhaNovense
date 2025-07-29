"use client";

import Image from "next/image";
import TransportCard from "../ui/TransportCard";
import { useState, useEffect } from "react";

const stations = [
  { name: "Gonçalo", whatsappLink: "https://wa.me/5511999999999" },
  { name: "Higor", whatsappLink: "https://wa.me/5511888888888" },
  { name: "Zé Doninha", whatsappLink: "https://wa.me/5511777777777" },
];

// Horários organizados por destino
const transportScheduleByDestination = {
  penedo: {
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
      },
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
      },
    ],
    sabado: [
      {
        id: "003",
        title: "Transporte 003 - Sábado",
        time: "08:00",
        route: "Pontos: Shopping e Universidade",
      },
    ],
  },
  arapiraca: {
    manha: [
      {
        id: "101",
        title: "Transporte 101 - Segunda à Sexta",
        time: "05:30",
        route: "Pontos: Centro e Rodoviária de Arapiraca",
      },
      {
        id: "102",
        title: "Transporte 102 - Segunda à Sexta",
        time: "08:00",
        route: "Pontos: Hospital e Shopping Arapiraca",
      },
    ],
    tarde: [
      {
        id: "103",
        title: "Transporte 103 - Segunda à Sexta",
        time: "13:30",
        route: "Pontos: Centro e Terminal Rodoviário",
      },
      {
        id: "104",
        title: "Transporte 104 - Segunda à Sexta",
        time: "16:00",
        route: "Pontos: Universidade e Centro",
      },
    ],
    sabado: [
      {
        id: "105",
        title: "Transporte 105 - Sábado",
        time: "07:00",
        route: "Pontos: Centro e Rodoviária",
      },
    ],
  },
  maceio: {
    manha: [
      {
        id: "201",
        title: "Transporte 201 - Segunda à Sexta",
        time: "04:30",
        route: "Pontos: Centro e Rodoviária de Maceió",
      },
    ],
    tarde: [
      {
        id: "202",
        title: "Transporte 202 - Segunda à Sexta",
        time: "15:00",
        route: "Pontos: Shopping Maceió e Praia",
      },
    ],
    sabado: [
      {
        id: "203",
        title: "Transporte 203 - Sábado",
        time: "06:00",
        route: "Pontos: Centro e Aeroporto",
      },
    ],
  },
};

type BusStatus = "waiting" | "departing" | "in_transit" | "finished";
type Destination = "penedo" | "arapiraca" | "maceio";

interface BusStatusInfo {
  id: string;
  status: BusStatus;
  nextDeparture?: string;
}

const destinations = [
  {
    key: "penedo" as Destination,
    name: "Penedo",
    icon: "🏰",
    color: "bg-[#EA580C]",
    hoverColor: "hover:bg-[#F97316]",
  },
  {
    key: "arapiraca" as Destination,
    name: "Arapiraca",
    icon: "🏢",
    color: "bg-[#EA580C]",
    hoverColor: "hover:bg-[#F97316]",
  },
  {
    key: "maceio" as Destination,
    name: "Maceió",
    icon: "🏖️",
    color: "bg-[#EA580C]",
    hoverColor: "hover:bg-[#F97316]",
  },
];

function Section2() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [busStatuses, setBusStatuses] = useState<BusStatusInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDrawer = (period: string) => {
    setActiveDrawer(activeDrawer === period ? null : period);
  };

  const handleDestinationChange = (destination: Destination) => {
    setIsLoading(true);
    setActiveDrawer(null); // Fecha gavetas abertas
    
    // Simula carregamento por 800ms
    setTimeout(() => {
      setSelectedDestination(destination);
      setIsLoading(false);
    }, 800);
  };

  const periods = [
    { key: "manha", label: "Manhã", icon: "🌅", color: "bg-[#EA580C]" },
    { key: "tarde", label: "Tarde", icon: "☀️", color: "bg-[#EA580C]" },
    { key: "sabado", label: "Sábado", icon: "📅", color: "bg-[#EA580C]" },
  ];

  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
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
      return "waiting";
    } else if (timeDiff >= 0 && timeDiff < 5) {
      return "departing";
    } else if (timeDiff >= 5 && timeDiff < 60) {
      return "in_transit";
    } else {
      return "finished";
    }
  };

  const getStatusText = (
    status: BusStatus
  ): { text: string; color: string; icon: string } => {
    switch (status) {
      case "waiting":
        return { text: "Aguardando", color: "text-gray-600", icon: "⏳" };
      case "departing":
        return { text: "Saindo agora", color: "text-yellow-600", icon: "🚌" };
      case "in_transit":
        return { text: "Em trânsito", color: "text-green-600", icon: "🚍" };
      case "finished":
        return { text: "Finalizado", color: "text-gray-400", icon: "✅" };
    }
  };

  const getNextBus = (): {
    time: string;
    period: string;
    destination: string;
  } | null => {
    const currentMinutes = getCurrentTimeInMinutes();
    const currentDay = new Date().getDay();
    const isWeekend = currentDay === 0 || currentDay === 6;

    let allBuses: { time: string; period: string; destination: string }[] = [];

    // Busca em todos os destinos
    Object.entries(transportScheduleByDestination).forEach(([dest, schedule]) => {
      if (!isWeekend || currentDay === 6) {
        if (currentDay === 6) {
          allBuses = [
            ...allBuses,
            ...schedule.sabado.map((bus) => ({
              time: bus.time,
              period: "sábado",
              destination: dest,
            })),
          ];
        } else {
          allBuses = [
            ...allBuses,
            ...schedule.manha.map((bus) => ({
              time: bus.time,
              period: "manhã",
              destination: dest,
            })),
            ...schedule.tarde.map((bus) => ({
              time: bus.time,
              period: "tarde",
              destination: dest,
            })),
          ];
        }
      }
    });

    const nextBuses = allBuses
      .filter((bus) => timeToMinutes(bus.time) > currentMinutes)
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

    return nextBuses[0] || null;
  };

  // Atualiza o tempo a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Atualiza os status dos ônibus
  useEffect(() => {
    if (!selectedDestination) return;

    const updateBusStatuses = () => {
      const currentSchedule = transportScheduleByDestination[selectedDestination];
      const allBuses = [
        ...currentSchedule.manha,
        ...currentSchedule.tarde,
        ...currentSchedule.sabado,
      ];

      const statuses = allBuses.map((bus) => ({
        id: bus.id,
        status: getBusStatus(bus.time, bus.id),
      }));

      setBusStatuses(statuses);
    };

    updateBusStatuses();
    const timer = setInterval(updateBusStatuses, 60000);

    return () => clearInterval(timer);
  }, [currentTime, selectedDestination]);

  const nextBus = getNextBus();
  const currentSchedule = selectedDestination ? transportScheduleByDestination[selectedDestination] : null;
  const selectedDestinationInfo = selectedDestination ? destinations.find(d => d.key === selectedDestination) : null;

  return (
    <main className="flex flex-col items-center justify-center p-6 lg:p-10">

      {/* Status em Tempo Real */}
      <div className="w-full max-w-4xl mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          🕐 Status em Tempo Real
        </h2>
        <div className="text-center">
          <p className="text-lg text-[#0F172A] mb-2">
            Agora são{" "}
            <span className="font-bold text-[#EA580C]">
              {currentTime.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
          {nextBus ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#EA580C]">
                🚌 Próximo ônibus: {nextBus.time} ({nextBus.period}) - {nextBus.destination.toUpperCase()}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg text-gray-600">Não há mais ônibus hoje</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Selecione o destino:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <button
              key={destination.key}
              onClick={() => handleDestinationChange(destination.key)}
              disabled={isLoading}
              className={`p-4 rounded-lg text-white font-bold transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
                selectedDestination === destination.key
                  ? `${destination.color} shadow-lg scale-105`
                  : `${destination.color} opacity-90 ${destination.hoverColor}`
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">{destination.icon}</span>
                <span className="text-lg">{destination.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="w-full max-w-4xl mb-8 bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center justify-center">
            {/* Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#FFA300] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl animate-bounce">🚌</span>
              </div>
            </div>
            
            {/* Loading Text */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Carregando horários...
              </h3>
              <p className="text-gray-600">
                Buscando as melhores rotas para você
              </p>
            </div>

            {/* Loading Dots */}
            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 bg-[#FFA300] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#FFA300] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#FFA300] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Informações da Rota - só aparece quando tem destino selecionado e não está carregando */}
      {selectedDestination && selectedDestinationInfo && !isLoading && (
        <article className="flex items-center justify-center gap-6 lg:gap-12 p-4 mb-8 bg-white rounded-lg shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <Image
              src="/Assets/Onibus.svg"
              alt="Ônibus"
              width={40}
              height={40}
              className="lg:w-12 lg:h-12"
              priority
            />
            <div className="flex flex-col text-center">
              <span className="text-xs font-light text-gray-600">Saída</span>
              <h2 className="font-bold text-black text-sm lg:text-base">
                Igreja Nova
              </h2>
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
            <div className="flex flex-col text-center">
              <span className="text-xs font-light text-gray-600">Destino</span>
              <h2 className="font-bold text-black text-sm lg:text-base flex items-center gap-2">
                {selectedDestinationInfo.icon} {selectedDestinationInfo.name}
              </h2>
            </div>
          </div>
        </article>
      )}

      {/* Mensagem inicial, Loading ou Horários por Período */}
      {!selectedDestination && !isLoading ? (
        <div className="w-full max-w-4xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🚌</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Escolha seu destino
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            Selecione um dos destinos acima para ver os horários de partida
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏰</span>
              <span>Penedo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <span>Arapiraca</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🏖️</span>
              <span>Maceió</span>
            </div>
          </div>
        </div>
      ) : selectedDestination && !isLoading ? (
        <div className="w-full max-w-4xl space-y-4 animate-slideUp">
          {periods.map((period, index) => (
            <div
              key={period.key}
              className="bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header da Gaveta */}
              <button
                onClick={() => toggleDrawer(period.key)}
                className={`w-full p-4 flex items-center justify-between ${period.color} text-white hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{period.icon}</span>
                  <h2 className="font-bold text-lg">{period.label}</h2>
                  <span className="text-sm opacity-80">
                    ({currentSchedule && currentSchedule[period.key as keyof typeof currentSchedule].length} horários)
                  </span>
                </div>
                <div
                  className={`transform transition-transform duration-200 ${
                    activeDrawer === period.key ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Conteúdo da Gaveta */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeDrawer === period.key
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSchedule && currentSchedule[period.key as keyof typeof currentSchedule].map((transport) => {
                      const busStatus = busStatuses.find(
                        (status) => status.id === transport.id
                      );
                      const statusInfo = busStatus
                        ? getStatusText(busStatus.status)
                        : null;

                      return (
                        <div key={transport.id} className="relative">
                          <TransportCard
                            title={transport.title}
                            time={transport.time}
                            route={transport.route}
                            stations={stations}
                          />
                          {statusInfo && (
                            <div
                              className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium bg-white border-2 border-gray-100 shadow-sm ${statusInfo.color} z-10`}
                            >
                              <span className="mr-1 text-xs">
                                {statusInfo.icon}
                              </span>
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
      ) : null}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

export default Section2;
