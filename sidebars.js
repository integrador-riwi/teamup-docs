/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type:  'category',
      label: 'User Manual',
      items: [
        'user-manual/introduction',
        'user-manual/access-and-register',
        'user-manual/admin',
        'user-manual/tech-lead',
        'user-manual/coder',
        'user-manual/contents'
      ],
    },
    {
      type:  'category',
      label: 'Architecture',
      items: ['architecture/overview',
              'architecture/ai-automation',
      ],
    },
    {
      type:  'category',
      label: 'Frontend',
      items: [
        'frontend/routing',
        'frontend/views',
        'frontend/components',
      ],
    },
    {
      type:  'category',
      label: 'Backend',
      items: [
        'backend/api-endpoints',
        'backend/controllers',
        'backend/models',
      ],
    },
    {
      type:  'category',
      label: 'Authentication',
      items: ['auth/authentication'],
    },
    {
      type:  'category',
      label: 'Real-time',
      items: ['realtime/socket'],
    },
    {
      type:  'category',
      label: 'Deployment',
      items: ['deployment/guide'],
    },
    {
      type:  'category',
      label: 'Contributing',
      items: ['contributing/guide'],
    },
  ],
};

export default sidebars;