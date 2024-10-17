import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Função para buscar as URLs dinâmicas do banco de dados via API
async function fetchDynamicRoutes() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/docs`;

  try {
    // Faz a requisição para sua API e pega os docs
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Erro ao buscar dados da API:', data.error);
      return [];
    }

    // Mapeia os docs e retorna os slugs para as URLs
    return data.docs.map((doc) => `/docs/${doc.slug}`);
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return [];
  }
}

export default async function handler(req, res) {
  const hostname = 'http://localhost:3000/'; // Altere para o seu domínio

  // Cria uma stream para o sitemap
  const stream = new SitemapStream({ hostname });

  // URLs estáticas que você tem no site
  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/docs', changefreq: 'daily', priority: 1.0 },
  ];

  // Adiciona as URLs estáticas ao sitemap
  staticRoutes.forEach(route => stream.write(route));

  // Buscar URLs dinâmicas e adicionar ao sitemap
  const dynamicRoutes = await fetchDynamicRoutes();
  dynamicRoutes.forEach(route => {
    stream.write({ url: route, changefreq: 'daily', priority: 0.8 });
  });

  // Finaliza o sitemap
  stream.end();

  // Converte o stream para XML e envia a resposta
  const sitemapData = await streamToPromise(Readable.from(stream)).then((data) => data.toString());

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemapData);
}