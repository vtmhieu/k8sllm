// @ts-check

const canonicalSiteUrl = 'https://www.k8sllm.online';
const normalizeSiteUrl = (value) => {
  const siteUrl = (value || canonicalSiteUrl).replace(/\/+$/, '');
  return siteUrl === 'https://k8sllm.online' ? canonicalSiteUrl : siteUrl;
};
const siteUrl = normalizeSiteUrl(process.env.DOCUSAURUS_SITE_URL);
const baseUrl = process.env.DOCUSAURUS_BASE_URL || '/';
const siteDescription =
  'A senior platform engineering guide for Kubernetes, production services, observability, security, GitOps, and LLM workloads on Kubernetes.';
const siteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kubernetes + LLM Platform Guide',
  alternateName: 'K8s + LLM Guide',
  url: `${siteUrl}/`,
  description: siteDescription,
  inLanguage: 'vi',
  about: [
    'Kubernetes',
    'Platform engineering',
    'LLM infrastructure',
    'vLLM',
    'KServe',
    'Ray Serve',
    'Observability',
    'Kubernetes security',
  ],
  sameAs: ['https://github.com/vtmhieu/k8sllm'],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kubernetes + LLM Platform Guide',
  tagline: 'Production Kubernetes, platform services, and AI infrastructure patterns for senior engineers.',
  favicon: 'img/brand-mark.svg',

  url: siteUrl,
  baseUrl,
  trailingSlash: false,

  organizationName: 'vtmhieu',
  projectName: 'k8sllm',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(siteStructuredData),
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/vtmhieu/k8sllm/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.svg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      metadata: [
        {
          name: 'description',
          content: siteDescription,
        },
        {
          name: 'keywords',
          content:
            'Kubernetes, LLM, Kubernetes LLM, LLM on Kubernetes, platform engineering, vLLM, KServe, Ray Serve, observability, security, GitOps',
        },
      ],
      navbar: {
        title: 'K8s + LLM Guide',
        logo: {
          alt: 'Kubernetes LLM Platform Guide mark',
          src: 'img/brand-mark.svg',
        },
        items: [
          { to: '/docs/kubernetes', label: 'Kubernetes', position: 'left' },
          { to: '/docs/best-practices', label: 'Best Practices', position: 'left' },
          { to: '/docs/platform-services', label: 'Platform Services', position: 'left' },
          { to: '/docs/llm-on-kubernetes', label: 'LLM', position: 'left' },
          { to: '/docs/reference-architectures', label: 'Architectures', position: 'left' },
          {
            href: 'https://github.com/vtmhieu/k8sllm',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Learning paths',
            items: [
              { label: 'Kubernetes Core', to: '/docs/kubernetes' },
              { label: 'Production Best Practices', to: '/docs/best-practices' },
              { label: 'LLM On Kubernetes', to: '/docs/llm-on-kubernetes' },
            ],
          },
          {
            title: 'Operate',
            items: [
              { label: 'Platform Services', to: '/docs/platform-services' },
              { label: 'Reference Architectures', to: '/docs/reference-architectures' },
            ],
          },
          {
            title: 'Source of truth',
            items: [
              { label: 'Kubernetes Docs', href: 'https://kubernetes.io/docs/' },
              { label: 'KServe', href: 'https://kserve.github.io/website/' },
              { label: 'Ray Serve', href: 'https://docs.ray.io/en/latest/serve/' },
              { label: 'vLLM', href: 'https://docs.vllm.ai/' },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} Kubernetes + LLM Platform Guide contributors.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['bash', 'yaml', 'go', 'json'],
      },
    }),
};

module.exports = config;
