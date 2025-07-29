import Image from 'next/image';
function Section1() {
  return (
    <main>
      <Image
        src="/Assets/igrejanova.jpg"
        alt="Imagem de um carro com uma mala"
        width={1000}
        height={6000}
        className="w-full h-auto object-center lg:w-full lg:h-200 object-fit"
        priority
      />

                  <article className=" p-7 bg-[#EA580C] flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl justify-center text-center leading-tight">Horário dos transportes Intermunicipais</h1>
            </article>
    </main>
)};
export default Section1;