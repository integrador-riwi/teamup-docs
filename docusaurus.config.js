// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title:           'TeamUp Docs',
  tagline:         'Documentation for the TeamUp platform',
  favicon:         'img/favicon.ico',
  url:             'https://teamup-docs.vercel.app',
  baseUrl:         '/',
  organizationName: 'integrador-riwi',
  projectName:     'teamup-docs',
  onBrokenLinks:   'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      es: {
        label: 'Español',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/integrador-riwi/teamup-docs/tree/main/',
        },
        blog: false, // disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'TeamUp',
        logo: {
          alt: 'TeamUp Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type:      'docSidebar',
            sidebarId: 'tutorialSidebar',
            position:  'left',
            label:     'Documentation',
          },
          {
            type:      'localeDropdown',
            position:  'right',
          },
          {
            href:     'https://github.com/integrador-riwi',
            label:    'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/intro' },
              { label: 'Architecture',    to: '/docs/architecture/overview' },
              { label: 'API Reference',   to: '/docs/backend/api-endpoints' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/integrador-riwi' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TeamUp — Crudzaso · Riwi`,
      },
      prism: {
        theme:     prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
      colorMode: {
        defaultMode:          'light',
        disableSwitch:        false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;