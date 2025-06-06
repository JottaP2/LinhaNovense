import Image from 'next/image';
import TransportCard from '../ui/TransportCard'; 

const stations = [
  { name: "Gonçalo", whatsappLink: "https://wa.me/5511999999999" },
  { name: "Higor", whatsappLink: "https://wa.me/5511888888888" },
  { name: "Zé Doninha", whatsappLink: "https://wa.me/5511777777777" }
];

const transportData = [
  {
    id: "001",
    title: "Transporte 001 - Segunda à Sexta",
    time: "06h10",
    route: "Pontos: Rua da Igreja e comercio da cidade",
  },
  {
    id: "002",
    title: "Transporte 002 - Segunda à Sexta",
    time: "07h30",
    route: "Pontos: Centro e Terminal Rodoviário",
  },
  {
    id: "003",
    title: "Transporte 003 - Sábado",
    time: "08h00",
    route: "Pontos: Shopping e Universidade",
  }
];

function Section3() {
    return (
        <main className="flex flex-col items-center justify-center p-6 lg:p-10">
            <h1 className="font-bold text-[#FFA300] text-xl lg:text-3xl mb-6">Horário da manhã</h1>
            
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

            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {transportData.map((transport) => (
                        <TransportCard
                            key={transport.id}
                            title={transport.title}
                            time={transport.time}
                            route={transport.route}
                            stations={stations}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
};

export default Section3;