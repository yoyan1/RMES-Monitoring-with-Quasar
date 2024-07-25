const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('src/pages/adminPages/IndexPage.vue') },
      { path: 'students', component: () => import('src/pages/adminPages/StudentsPage.vue') },
      { path: 'attendance', component: () => import('src/pages/adminPages/AttendancePage.vue') },
      { path: 'requests', component: () => import('src/pages/adminPages/RequestsPage.vue') },
      { path: 'archives', component: () => import('src/pages/adminPages/ArchiveStudents.vue') },
      { path: 'accounts', component: () => import('src/pages/adminPages/ManageAccount.vue') },
      { path: 'setting', component: () => import('src/pages/adminPages/SettingPage.vue') },
      {
        path: '/test',
        component: () => import('pages/testPage.vue')
      },
    ]
  },
  {
    path: '/time-in-out',
    component: () => import('src/pages/scanner/QrScanner.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
