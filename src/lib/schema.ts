import {
  doctor,
  clinic,
  links,
  phoneE164,
  topics,
  faqItems,
  educationalContent,
  talkVideo,
} from '../data/site';

export interface VideoSchemaInput {
  title: string;
  summary: string;
  videoSrc: string;
  durationISO: string;
  uploadDate: string;
  /** URL (relativa ao site) do poster já otimizado pelo astro:assets. */
  poster: string;
}

interface SchemaOptions {
  site: URL;
  canonical: URL;
  description: string;
  title: string;
  ogImage: URL;
  /** Página principal: inclui Physician, MedicalClinic, vídeos e FAQ. */
  full: boolean;
  /** URL (relativa) da foto da médica, já otimizada. */
  physicianImage?: string;
  videos?: VideoSchemaInput[];
}

const abs = (path: string, site: URL) => new URL(path, site).href;

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: clinic.street,
  addressLocality: clinic.city,
  addressRegion: clinic.state,
  postalCode: clinic.postalCode,
  addressCountry: 'BR',
});

export function buildSchema(opts: SchemaOptions) {
  const { site, canonical } = opts;
  const root = site.href.replace(/\/$/, '');
  const ids = {
    website: `${root}/#website`,
    physician: `${root}/#physician`,
    clinic: `${root}/#clinic`,
    webpage: `${canonical.href}#webpage`,
  };

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': ids.website,
      name: doctor.name,
      url: abs('/', site),
      inLanguage: 'pt-BR',
      publisher: { '@id': ids.physician },
    },
    {
      '@type': 'WebPage',
      '@id': ids.webpage,
      url: canonical.href,
      name: opts.title,
      description: opts.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.physician },
      primaryImageOfPage: { '@type': 'ImageObject', url: opts.ogImage.href },
    },
  ];

  if (!opts.full) return { '@context': 'https://schema.org', '@graph': graph };

  graph.push(
    {
      '@type': 'Physician',
      '@id': ids.physician,
      name: doctor.name,
      url: abs('/', site),
      ...(opts.physicianImage ? { image: abs(opts.physicianImage, site) } : {}),
      description: opts.description,
      telephone: phoneE164,
      medicalSpecialty: 'PrimaryCare',
      knowsAbout: topics,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro profissional',
          name: `CRM/${doctor.state} ${doctor.crm}`,
          recognizedBy: {
            '@type': 'Organization',
            name: `Conselho Regional de Medicina de ${doctor.stateFull}`,
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro de Qualificação de Especialista',
          name: `RQE ${doctor.rqe}`,
        },
      ],
      address: postalAddress(),
      areaServed: { '@type': 'City', name: clinic.city },
      location: { '@id': ids.clinic },
      sameAs: [links.instagram],
      hasMap: links.googleMaps,
    },
    {
      '@type': 'MedicalClinic',
      '@id': ids.clinic,
      name: clinic.name,
      address: postalAddress(),
      hasMap: links.googleMaps,
      medicalSpecialty: 'PrimaryCare',
    },
  );

  for (const video of opts.videos ?? []) {
    graph.push({
      '@type': 'VideoObject',
      '@id': `${abs(video.videoSrc, site)}#video`,
      name: video.title,
      description: video.summary,
      thumbnailUrl: abs(video.poster, site),
      contentUrl: abs(video.videoSrc, site),
      uploadDate: video.uploadDate,
      duration: video.durationISO,
      inLanguage: 'pt-BR',
      author: { '@id': ids.physician },
    });
  }

  graph.push({
    '@type': 'FAQPage',
    '@id': `${canonical.href}#faq`,
    isPartOf: { '@id': ids.webpage },
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  });

  return { '@context': 'https://schema.org', '@graph': graph };
}

export const videoSources = [...educationalContent, talkVideo];
