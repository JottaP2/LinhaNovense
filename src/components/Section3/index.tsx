import Image from 'next/image';

function Section3() {
    return (
        <main className="flex flex-col items-center justify-center p-10">
            <h1 className="font-bold text-[#FFA300] text-xl">Horario da manhã</h1>
            <article className='flex items-start justify-between gap-4 p-4'>
                <Image
                    src="/Assets/Onibus.svg"
                    alt="Imagem de um carro com uma mala"
                    width={20}
                    height={30}
                    className="self-end"
                    priority
                />
                <div className='flex flex-col text-center items-center justify-center'>

                    <h1 className='text-2xl font-bold leading-5'><span className='text-xs font-light'>Saida</span> <br />Igreja Nova</h1>
                </div>

                <Image
                    src="/Assets/Route.svg"
                    alt="Imagem de um carro com uma mala"
                    width={20}
                    height={30}
                    className="self-end"
                    priority
                />
                <div className='flex flex-col text-center items-center justify-center'>
                    <h1 className='text-2xl font-bold leading-5'><span className='text-xs font-light'>Destino</span> <br />Penedo</h1>
                </div>
            </article>
        </main>
    )

};

export default Section3;
