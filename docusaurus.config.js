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
            to: '/docs/preface/getting-started',
            from: ['/docs/getting-started.html', '/docs/getting-started']
          },
          {
            to: '/docs/clusters/cluster',
            from: ['/docs/cluster.html', '/docs/cluster']
          },
          {
            to: '/docs/namespaces/namespaces',
            from: ['/docs/namespaces.html', '/docs/namespaces']
          },
          {
            to: '/docs/namespaces/team-management',
            from: ['/docs/team-management.html', '/docs/team-management']
          },
          {
            to: '/docs/plans/resources',
            from: ['/docs/resources.html', '/docs/resources']
          },
          {
            to: '/docs/images/images',
            from: ['/docs/images.html', '/docs/images']
          },
          {
            to: '/docs/services/services',
            from: ['/docs/services.html', '/docs/services']
          },
          {
            to: '/docs/services/service-manifest',
            from: ['/docs/service-manifest.html', '/docs/service-manifest']
          },
          {
            to: '/docs/services/service-lifecycle-handlers',
            from: ['/docs/service-lifecycle-handlers.html', '/docs/service-lifecycle-handlers']
          },
          {
            to: '/docs/services/exec',
            from: ['/docs/exec.html', '/docs/exec']
          },
          {
            to: '/docs/services/rollback',
            from: ['/docs/rollback.html', '/docs/rollback']
          },
          {
            to: '/docs/source-deployments/source-intro',
            from: ['/docs/source-intro.html', '/docs/source-intro']
          },
          {
            to: '/docs/source-deployments/source-static',
            from: ['/docs/source-static.html', '/docs/source-static']
          },
          {
            to: '/docs/source-deployments/source-django',
            from: ['/docs/source-django.html', '/docs/source-django']
          },
          {
            to: '/docs/source-deployments/source-laravel',
            from: ['/docs/source-laravel.html', '/docs/source-laravel']
          },
          {
            to: '/docs/source-deployments/source-aspnetcore',
            from: ['/docs/source-aspnetcore.html', '/docs/source-aspnetcore']
          },
          {
            to: '/docs/source-deployments/source-nodejs',
            from: ['/docs/source-nodejs.html', '/docs/source-nodejs']
          },
          {
            to: '/docs/source-deployments/source-spring-boot',
            from: ['/docs/source-spring-boot.html', '/docs/source-spring-boot']
          },
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
          {
            to: '/docs/domains/custom-domains',
            from: ['/docs/custom-domains.html', '/docs/custom-domains']
          },
          {
            to: '/docs/domains/ssl-certificate',
            from: ['/docs/ssl-certificate.html', '/docs/ssl-certificate']
          },
          {
            to: '/docs/secrets/secret',
            from: ['/docs/secret.html', '/docs/secret']
          },
          {
            to: '/docs/secrets/docker-registry-secret',
            from: ['/docs/docker-registry-secret.html', '/docs/docker-registry-secret']
          },
          {
            to: '/docs/secrets/environment-secret-secret',
            from: ['/docs/environment-secret-secret.html', '/docs/environment-secret-secret']
          },
          {
            to: '/docs/volumes/dedicated-volume',
            from: ['/docs/dedicated-volume.html', '/docs/dedicated-volume']
          },
          {
            to: '/docs/volumes/attach-volume-to-service',
            from: ['/docs/attach-volume-to-service.html', '/docs/attach-volume-to-service']
          },
          {
            to: '/docs/volumes/volume-browser',
            from: ['/docs/volume-browser.html', '/docs/volume-browser']
          },
          {
            to: '/docs/volumes/dedicated-volume-expansion',
            from: ['/docs/dedicated-volume-expansion.html', '/docs/dedicated-volume-expansion']
          },
          {
            to: '/docs/cheatsheets/fandogh-cli-cheat-sheet',
            from: ['/docs/fandogh-cli-cheat-sheet.html', '/docs/fandogh-cli-cheat-sheet']
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
