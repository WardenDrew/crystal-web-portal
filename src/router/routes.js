const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue')},
      { path: 'food', meta: { title: 'Food' }, component: () => import('pages/FoodPage.vue') },
      { path: 'health', meta: { title: 'Health' }, component: () => import('pages/HealthPage.vue') },
      { path: 'assists', meta: { title: 'Assists' }, component: () => import('pages/AssistsPage.vue') },
      { path: 'social', meta: { title: 'Social' }, component: () => import('pages/SocialPage.vue') },
      { path: 'safety', meta: { title: 'Safety' }, component: () => import('pages/SafetyPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ErrorNotFound.vue') }
    ]
  }
]

export default routes
