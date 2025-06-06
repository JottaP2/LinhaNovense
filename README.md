# Transporte IG

Aplicação web para consulta de horários de transportes intermunicipais de Igreja Nova para outros municípios.

## ✨ Funcionalidades

- Consulta de horários de ônibus (manhã, tarde, sábado)
- Visualização dos pontos de saída e destino
- Contato rápido com motoristas via WhatsApp
- Layout responsivo e moderno

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) 
- [React](https://react.dev/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [TypeScript](https://www.typescriptlang.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/transporte-ig.git
cd transporte-ig
npm install
```

## 🏃 Como rodar

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 📁 Estrutura do Projeto

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Header/
    Section1/
    Section2/
    Section3/
    ui/
      TransportCard.tsx
public/
  Assets/
    logos_lateral.png
    igrejanova.jpg
    Onibus.svg
    Route.svg
```

## 📝 Personalização

- Para alterar os horários, edite o arquivo [`Section3/index.tsx`](src/components/Section3/index.tsx).
- Para atualizar contatos dos motoristas, modifique o array `stations` no mesmo arquivo.
- Imagens e logos ficam em `public/Assets`.

## 📄 Licença

Este projeto é open-source, sinta-se livre para usar e contribuir!

---

Feito por João Paulo Marinho Santos
