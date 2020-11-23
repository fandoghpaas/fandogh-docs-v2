module.exports = {
  title: 'مستندات سکوی ابری فندق',
  tagline: 'اولین سکوی ابری عمومی ایران',
  url: 'https://docs.fandogh.cloud',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/fandogh.png',
  organizationName: 'Fandogh PaaS', // Usually your GitHub org/user name.
  projectName: 'fandogh-docs', // Usually your repo name.
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'concepts',
        path: 'concepts',
        editUrl:
            'https://github.com/fandoghpaas/fandogh-docs/edit/master/',
        routeBasePath: 'concepts',
        sidebarPath: require.resolve('./conceptsSidebar.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api',
        editUrl:
            'https://github.com/fandoghpaas/fandogh-docs/edit/master/',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./apiSidebar.js'),
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/managed-services/gitlab-managed-service',
            from: ['/docs/gitlab-managed-service.html', '/docs/gitlab-managed-service']
          },
          {
            to: '/docs/managed-services/gitlab-runner-managed-service',
            from: ['/docs/gitlab-ruuner-managed-service.html', '/docs/gitlab-ruuner-managed-service']
          },
          {
            to: '/docs/managed-services/elasticsearch-managed-service',
            from: ['/docs/elasticsearch-managed-service.html', '/docs/elasticsearch-managed-service']
          },
          {
            to: '/docs/managed-services/file-browser-managed-service',
            from: ['/docs/file-browser-managed-service.html', '/docs/file-browser-managed-service']
          },
          {
            to: '/docs/managed-services/kibana-managed-service',
            from: ['/docs/kibana-managed-service.html', '/docs/kibana-managed-service']
          },
          {
            to: '/docs/managed-services/managed-services-intro',
            from: ['/docs/managed-services-intro.html', '/docs/managed-services-intro']
          },
          {
            to: '/docs/managed-services/minio-managed-service',
            from: ['/docs/minio-managed-service.html', '/docs/minio-managed-service']
          },
          {
            to: '/docs/managed-services/mongodb-managed-service',
            from: ['/docs/mongodb-managed-service.html', '/docs/mongodb-managed-service']
          },
          {
            to: '/docs/managed-services/mssql-managed-service',
            from: ['/docs/mssql-managed-service.html', '/docs/mssql-managed-service']
          },
          {
            to: '/docs/managed-services/mysql-managed-service',
            from: ['/docs/mysql-managed-service.html', '/docs/mysql-managed-service']
          },
          {
            to: '/docs/managed-services/postgresql-managed-service',
            from: ['/docs/postgresql-managed-service.html', '/docs/postgresql-managed-service']
          },
          {
            to: '/docs/managed-services/proxy-managed-service',
            from: ['/docs/proxy-managed-service.html', '/docs/proxy-managed-service']
          },
          {
            to: '/docs/managed-services/rabbitmq-managed-service',
            from: ['/docs/rabbitmq-managed-service.html', '/docs/rabbitmq-managed-service']
          },
          {
            to: '/docs/managed-services/redis-managed-service',
            from: ['/docs/redis-managed-service.html', '/docs/redis-managed-service']
          },
        ],
      },
    ],
  ],
  themeConfig: {
    hideableSidebar: true,
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    announcementBar: {
      id: 'support_us', // Any value that will identify this message.
      content: 'مستندات سکوی ابری فندق بروزرسانی شد.',
      backgroundColor: '#fafbfc', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: true, // Defaults to `true`.
    },
    googleAnalytics: {
      trackingID: 'UA-120059029-1'
    },
    image: 'img/fandogh.png',
    metadatas: [{name: 'twitter:card', content: 'summary'}, 
                {name: 'description', content: 'سکوی ابری فندق اولین سکوی ابری عمومی ایران'},
                {name: 'og:image', content: 'https://doc-demo-sorena.fandogh.cloud/img/fandogh.png'}],
    ogImage: 'img/fandogh.png',
    twitterImage: 'img/fandogh.png',
    colorMode:{
      defaultMode: 'dark',
      switchConfig: {
        darkIcon: '🌙',
        lightIcon: '🌕',
      }
    },
    navbar: {
      hideOnScroll: true,
      title: 'سکوی ابری فندق',
      logo: {
        alt: 'Fandogh PaaS',
        src: 'img/fandogh.svg',
      },
      items: [
        {
          to: 'docs/preface/getting-started',
          activeBasePath: 'docs',
          label: 'مستندات',
          position: 'left',
        },
        {href: 'https://blog.fandogh.cloud', label: 'بلاگ', position: 'left'},
        {href: '/api/namespaces', label: 'API', position: 'left'},
//        {href: '/concepts/getting-started', label: 'مفاهیم', position: 'left'},
        {href: 'https://www.fandogh.cloud/faq', label: 'پرسش‌های متداول', position: 'left'},
        {
          href: 'https://github.com/fandoghpaas/fandogh-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        alt: 'Fandogh PaaS Logo',
        src: 'img/fandogh.png',
        href: 'https://www.fandogh.cloud',
      },
      style: 'dark',
      links: [
        {
          title: 'بیشتر',
          items: [
            {
              label: 'blog',
              to: 'https://blog.fandogh.cloud',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/fandoghpaas/fandogh-docs',
            },
            {
              label: 'email',
              href: 'mailto:support@fandogh.cloud'
            },
            {
              label: 'twitter',
              href: 'https://twitter.com/fandoghpaas'
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fandogh PaaS, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
       {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/fandoghpaas/fandogh-docs-v2/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
