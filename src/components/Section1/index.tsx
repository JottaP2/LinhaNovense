import Image from 'next/image';
function Section1() {
  return (
    <main>
      <Image
        src="/Assets/igrejanova.jpg"
        alt="Imagem de um carro com uma mala"
        width={40}
        height={60}
        className="w-full h-auto object-center lg:w-full lg:h-200 object-fit"
        priority
      />
    </main>
)};
export default Section1;