import { PhoneCall, Instagram } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-zinc-800 py-6 px-4 text-white">
            <div className="max-w-4xl mx-auto">
   
                <div className="flex items-center justify-center gap-4 mb-4">
                    <h2 className="text-lg font-medium">Contato</h2>
                    <div className="flex items-center gap-3">
                        <a 
                            href="https://wa.me/5582999946974?text=Ol%C3%A1%2C%20Cheguei%20aqui%20pelo%20link%20de%20contato%20do%20Linha%20Novense!" 
                            className="hover:text-orange-400 transition-colors duration-200"
                            aria-label="Telefone zap para contato"
                        >
                            <PhoneCall size={20} />
                        </a>
                        <a 
                            href="https://www.instagram.com/jottamarinhoo_/" 
                            className="hover:text-orange-400 transition-colors duration-200"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
                
          
                <hr className="border-zinc-600 mb-4" />
                
  
                <div className="text-center">
                    <p className="text-sm text-zinc-400">
                        Desenvolvido por João Paulo Marinho Santos
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                        © {new Date().getFullYear()} Todos os direitos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;