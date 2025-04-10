/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardRouteImport } from './routes/dashboard/route'
import { Route as AuthRouteImport } from './routes/auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardOrganizationsRouteImport } from './routes/dashboard/organizations/route'
import { Route as DashboardProfileIndexImport } from './routes/dashboard/profile/index'
import { Route as DashboardPersonalprojectsIndexImport } from './routes/dashboard/personal_projects/index'
import { Route as DashboardOverviewIndexImport } from './routes/dashboard/overview/index'
import { Route as DashboardNotificationsIndexImport } from './routes/dashboard/notifications/index'
import { Route as AuthSignupIndexImport } from './routes/auth/signup/index'
import { Route as AuthResetPasswordIndexImport } from './routes/auth/reset-password/index'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as AuthForgotPasswordIndexImport } from './routes/auth/forgot-password/index'
import { Route as DashboardPersonalprojectsProjectidImport } from './routes/dashboard/personal_projects/$project_id'
import { Route as DashboardOrganizationsOtherorganizationsIndexImport } from './routes/dashboard/organizations/other_organizations/index'
import { Route as DashboardOrganizationsMyorganizationsIndexImport } from './routes/dashboard/organizations/my_organizations/index'
import { Route as DashboardOrganizationsInvitationsIndexImport } from './routes/dashboard/organizations/invitations/index'
import { Route as DashboardOrganizationsOrganizationidIndexImport } from './routes/dashboard/organizations/$organization_id/index'
import { Route as DashboardOrganizationsOtherorganizationsOrganizationidImport } from './routes/dashboard/organizations/other_organizations/$organization_id'
import { Route as DashboardOrganizationsOrganizationidMembersImport } from './routes/dashboard/organizations/$organization_id/members'

// Create/Update Routes

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardOrganizationsRouteRoute =
  DashboardOrganizationsRouteImport.update({
    id: '/organizations',
    path: '/organizations',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const DashboardProfileIndexRoute = DashboardProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardPersonalprojectsIndexRoute =
  DashboardPersonalprojectsIndexImport.update({
    id: '/personal_projects/',
    path: '/personal_projects/',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const DashboardOverviewIndexRoute = DashboardOverviewIndexImport.update({
  id: '/overview/',
  path: '/overview/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardNotificationsIndexRoute =
  DashboardNotificationsIndexImport.update({
    id: '/notifications/',
    path: '/notifications/',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const AuthSignupIndexRoute = AuthSignupIndexImport.update({
  id: '/signup/',
  path: '/signup/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthResetPasswordIndexRoute = AuthResetPasswordIndexImport.update({
  id: '/reset-password/',
  path: '/reset-password/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthForgotPasswordIndexRoute = AuthForgotPasswordIndexImport.update({
  id: '/forgot-password/',
  path: '/forgot-password/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const DashboardPersonalprojectsProjectidRoute =
  DashboardPersonalprojectsProjectidImport.update({
    id: '/personal_projects/$project_id',
    path: '/personal_projects/$project_id',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const DashboardOrganizationsOtherorganizationsIndexRoute =
  DashboardOrganizationsOtherorganizationsIndexImport.update({
    id: '/other_organizations/',
    path: '/other_organizations/',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

const DashboardOrganizationsMyorganizationsIndexRoute =
  DashboardOrganizationsMyorganizationsIndexImport.update({
    id: '/my_organizations/',
    path: '/my_organizations/',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

const DashboardOrganizationsInvitationsIndexRoute =
  DashboardOrganizationsInvitationsIndexImport.update({
    id: '/invitations/',
    path: '/invitations/',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

const DashboardOrganizationsOrganizationidIndexRoute =
  DashboardOrganizationsOrganizationidIndexImport.update({
    id: '/$organization_id/',
    path: '/$organization_id/',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

const DashboardOrganizationsOtherorganizationsOrganizationidRoute =
  DashboardOrganizationsOtherorganizationsOrganizationidImport.update({
    id: '/other_organizations/$organization_id',
    path: '/other_organizations/$organization_id',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

const DashboardOrganizationsOrganizationidMembersRoute =
  DashboardOrganizationsOrganizationidMembersImport.update({
    id: '/$organization_id/members',
    path: '/$organization_id/members',
    getParentRoute: () => DashboardOrganizationsRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/organizations': {
      id: '/dashboard/organizations'
      path: '/organizations'
      fullPath: '/dashboard/organizations'
      preLoaderRoute: typeof DashboardOrganizationsRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/personal_projects/$project_id': {
      id: '/dashboard/personal_projects/$project_id'
      path: '/personal_projects/$project_id'
      fullPath: '/dashboard/personal_projects/$project_id'
      preLoaderRoute: typeof DashboardPersonalprojectsProjectidImport
      parentRoute: typeof DashboardRouteImport
    }
    '/auth/forgot-password/': {
      id: '/auth/forgot-password/'
      path: '/forgot-password'
      fullPath: '/auth/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/auth/login/': {
      id: '/auth/login/'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/auth/reset-password/': {
      id: '/auth/reset-password/'
      path: '/reset-password'
      fullPath: '/auth/reset-password'
      preLoaderRoute: typeof AuthResetPasswordIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/auth/signup/': {
      id: '/auth/signup/'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/dashboard/notifications/': {
      id: '/dashboard/notifications/'
      path: '/notifications'
      fullPath: '/dashboard/notifications'
      preLoaderRoute: typeof DashboardNotificationsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/overview/': {
      id: '/dashboard/overview/'
      path: '/overview'
      fullPath: '/dashboard/overview'
      preLoaderRoute: typeof DashboardOverviewIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/personal_projects/': {
      id: '/dashboard/personal_projects/'
      path: '/personal_projects'
      fullPath: '/dashboard/personal_projects'
      preLoaderRoute: typeof DashboardPersonalprojectsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/profile/': {
      id: '/dashboard/profile/'
      path: '/profile'
      fullPath: '/dashboard/profile'
      preLoaderRoute: typeof DashboardProfileIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/organizations/$organization_id/members': {
      id: '/dashboard/organizations/$organization_id/members'
      path: '/$organization_id/members'
      fullPath: '/dashboard/organizations/$organization_id/members'
      preLoaderRoute: typeof DashboardOrganizationsOrganizationidMembersImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
    '/dashboard/organizations/other_organizations/$organization_id': {
      id: '/dashboard/organizations/other_organizations/$organization_id'
      path: '/other_organizations/$organization_id'
      fullPath: '/dashboard/organizations/other_organizations/$organization_id'
      preLoaderRoute: typeof DashboardOrganizationsOtherorganizationsOrganizationidImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
    '/dashboard/organizations/$organization_id/': {
      id: '/dashboard/organizations/$organization_id/'
      path: '/$organization_id'
      fullPath: '/dashboard/organizations/$organization_id'
      preLoaderRoute: typeof DashboardOrganizationsOrganizationidIndexImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
    '/dashboard/organizations/invitations/': {
      id: '/dashboard/organizations/invitations/'
      path: '/invitations'
      fullPath: '/dashboard/organizations/invitations'
      preLoaderRoute: typeof DashboardOrganizationsInvitationsIndexImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
    '/dashboard/organizations/my_organizations/': {
      id: '/dashboard/organizations/my_organizations/'
      path: '/my_organizations'
      fullPath: '/dashboard/organizations/my_organizations'
      preLoaderRoute: typeof DashboardOrganizationsMyorganizationsIndexImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
    '/dashboard/organizations/other_organizations/': {
      id: '/dashboard/organizations/other_organizations/'
      path: '/other_organizations'
      fullPath: '/dashboard/organizations/other_organizations'
      preLoaderRoute: typeof DashboardOrganizationsOtherorganizationsIndexImport
      parentRoute: typeof DashboardOrganizationsRouteImport
    }
  }
}

// Create and export the route tree

interface AuthRouteRouteChildren {
  AuthForgotPasswordIndexRoute: typeof AuthForgotPasswordIndexRoute
  AuthLoginIndexRoute: typeof AuthLoginIndexRoute
  AuthResetPasswordIndexRoute: typeof AuthResetPasswordIndexRoute
  AuthSignupIndexRoute: typeof AuthSignupIndexRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthForgotPasswordIndexRoute: AuthForgotPasswordIndexRoute,
  AuthLoginIndexRoute: AuthLoginIndexRoute,
  AuthResetPasswordIndexRoute: AuthResetPasswordIndexRoute,
  AuthSignupIndexRoute: AuthSignupIndexRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface DashboardOrganizationsRouteRouteChildren {
  DashboardOrganizationsOrganizationidMembersRoute: typeof DashboardOrganizationsOrganizationidMembersRoute
  DashboardOrganizationsOtherorganizationsOrganizationidRoute: typeof DashboardOrganizationsOtherorganizationsOrganizationidRoute
  DashboardOrganizationsOrganizationidIndexRoute: typeof DashboardOrganizationsOrganizationidIndexRoute
  DashboardOrganizationsInvitationsIndexRoute: typeof DashboardOrganizationsInvitationsIndexRoute
  DashboardOrganizationsMyorganizationsIndexRoute: typeof DashboardOrganizationsMyorganizationsIndexRoute
  DashboardOrganizationsOtherorganizationsIndexRoute: typeof DashboardOrganizationsOtherorganizationsIndexRoute
}

const DashboardOrganizationsRouteRouteChildren: DashboardOrganizationsRouteRouteChildren =
  {
    DashboardOrganizationsOrganizationidMembersRoute:
      DashboardOrganizationsOrganizationidMembersRoute,
    DashboardOrganizationsOtherorganizationsOrganizationidRoute:
      DashboardOrganizationsOtherorganizationsOrganizationidRoute,
    DashboardOrganizationsOrganizationidIndexRoute:
      DashboardOrganizationsOrganizationidIndexRoute,
    DashboardOrganizationsInvitationsIndexRoute:
      DashboardOrganizationsInvitationsIndexRoute,
    DashboardOrganizationsMyorganizationsIndexRoute:
      DashboardOrganizationsMyorganizationsIndexRoute,
    DashboardOrganizationsOtherorganizationsIndexRoute:
      DashboardOrganizationsOtherorganizationsIndexRoute,
  }

const DashboardOrganizationsRouteRouteWithChildren =
  DashboardOrganizationsRouteRoute._addFileChildren(
    DashboardOrganizationsRouteRouteChildren,
  )

interface DashboardRouteRouteChildren {
  DashboardOrganizationsRouteRoute: typeof DashboardOrganizationsRouteRouteWithChildren
  DashboardPersonalprojectsProjectidRoute: typeof DashboardPersonalprojectsProjectidRoute
  DashboardNotificationsIndexRoute: typeof DashboardNotificationsIndexRoute
  DashboardOverviewIndexRoute: typeof DashboardOverviewIndexRoute
  DashboardPersonalprojectsIndexRoute: typeof DashboardPersonalprojectsIndexRoute
  DashboardProfileIndexRoute: typeof DashboardProfileIndexRoute
}

const DashboardRouteRouteChildren: DashboardRouteRouteChildren = {
  DashboardOrganizationsRouteRoute:
    DashboardOrganizationsRouteRouteWithChildren,
  DashboardPersonalprojectsProjectidRoute:
    DashboardPersonalprojectsProjectidRoute,
  DashboardNotificationsIndexRoute: DashboardNotificationsIndexRoute,
  DashboardOverviewIndexRoute: DashboardOverviewIndexRoute,
  DashboardPersonalprojectsIndexRoute: DashboardPersonalprojectsIndexRoute,
  DashboardProfileIndexRoute: DashboardProfileIndexRoute,
}

const DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(
  DashboardRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/dashboard/organizations': typeof DashboardOrganizationsRouteRouteWithChildren
  '/dashboard/personal_projects/$project_id': typeof DashboardPersonalprojectsProjectidRoute
  '/auth/forgot-password': typeof AuthForgotPasswordIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/reset-password': typeof AuthResetPasswordIndexRoute
  '/auth/signup': typeof AuthSignupIndexRoute
  '/dashboard/notifications': typeof DashboardNotificationsIndexRoute
  '/dashboard/overview': typeof DashboardOverviewIndexRoute
  '/dashboard/personal_projects': typeof DashboardPersonalprojectsIndexRoute
  '/dashboard/profile': typeof DashboardProfileIndexRoute
  '/dashboard/organizations/$organization_id/members': typeof DashboardOrganizationsOrganizationidMembersRoute
  '/dashboard/organizations/other_organizations/$organization_id': typeof DashboardOrganizationsOtherorganizationsOrganizationidRoute
  '/dashboard/organizations/$organization_id': typeof DashboardOrganizationsOrganizationidIndexRoute
  '/dashboard/organizations/invitations': typeof DashboardOrganizationsInvitationsIndexRoute
  '/dashboard/organizations/my_organizations': typeof DashboardOrganizationsMyorganizationsIndexRoute
  '/dashboard/organizations/other_organizations': typeof DashboardOrganizationsOtherorganizationsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/dashboard/organizations': typeof DashboardOrganizationsRouteRouteWithChildren
  '/dashboard/personal_projects/$project_id': typeof DashboardPersonalprojectsProjectidRoute
  '/auth/forgot-password': typeof AuthForgotPasswordIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/reset-password': typeof AuthResetPasswordIndexRoute
  '/auth/signup': typeof AuthSignupIndexRoute
  '/dashboard/notifications': typeof DashboardNotificationsIndexRoute
  '/dashboard/overview': typeof DashboardOverviewIndexRoute
  '/dashboard/personal_projects': typeof DashboardPersonalprojectsIndexRoute
  '/dashboard/profile': typeof DashboardProfileIndexRoute
  '/dashboard/organizations/$organization_id/members': typeof DashboardOrganizationsOrganizationidMembersRoute
  '/dashboard/organizations/other_organizations/$organization_id': typeof DashboardOrganizationsOtherorganizationsOrganizationidRoute
  '/dashboard/organizations/$organization_id': typeof DashboardOrganizationsOrganizationidIndexRoute
  '/dashboard/organizations/invitations': typeof DashboardOrganizationsInvitationsIndexRoute
  '/dashboard/organizations/my_organizations': typeof DashboardOrganizationsMyorganizationsIndexRoute
  '/dashboard/organizations/other_organizations': typeof DashboardOrganizationsOtherorganizationsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/dashboard/organizations': typeof DashboardOrganizationsRouteRouteWithChildren
  '/dashboard/personal_projects/$project_id': typeof DashboardPersonalprojectsProjectidRoute
  '/auth/forgot-password/': typeof AuthForgotPasswordIndexRoute
  '/auth/login/': typeof AuthLoginIndexRoute
  '/auth/reset-password/': typeof AuthResetPasswordIndexRoute
  '/auth/signup/': typeof AuthSignupIndexRoute
  '/dashboard/notifications/': typeof DashboardNotificationsIndexRoute
  '/dashboard/overview/': typeof DashboardOverviewIndexRoute
  '/dashboard/personal_projects/': typeof DashboardPersonalprojectsIndexRoute
  '/dashboard/profile/': typeof DashboardProfileIndexRoute
  '/dashboard/organizations/$organization_id/members': typeof DashboardOrganizationsOrganizationidMembersRoute
  '/dashboard/organizations/other_organizations/$organization_id': typeof DashboardOrganizationsOtherorganizationsOrganizationidRoute
  '/dashboard/organizations/$organization_id/': typeof DashboardOrganizationsOrganizationidIndexRoute
  '/dashboard/organizations/invitations/': typeof DashboardOrganizationsInvitationsIndexRoute
  '/dashboard/organizations/my_organizations/': typeof DashboardOrganizationsMyorganizationsIndexRoute
  '/dashboard/organizations/other_organizations/': typeof DashboardOrganizationsOtherorganizationsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/dashboard/organizations'
    | '/dashboard/personal_projects/$project_id'
    | '/auth/forgot-password'
    | '/auth/login'
    | '/auth/reset-password'
    | '/auth/signup'
    | '/dashboard/notifications'
    | '/dashboard/overview'
    | '/dashboard/personal_projects'
    | '/dashboard/profile'
    | '/dashboard/organizations/$organization_id/members'
    | '/dashboard/organizations/other_organizations/$organization_id'
    | '/dashboard/organizations/$organization_id'
    | '/dashboard/organizations/invitations'
    | '/dashboard/organizations/my_organizations'
    | '/dashboard/organizations/other_organizations'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/dashboard/organizations'
    | '/dashboard/personal_projects/$project_id'
    | '/auth/forgot-password'
    | '/auth/login'
    | '/auth/reset-password'
    | '/auth/signup'
    | '/dashboard/notifications'
    | '/dashboard/overview'
    | '/dashboard/personal_projects'
    | '/dashboard/profile'
    | '/dashboard/organizations/$organization_id/members'
    | '/dashboard/organizations/other_organizations/$organization_id'
    | '/dashboard/organizations/$organization_id'
    | '/dashboard/organizations/invitations'
    | '/dashboard/organizations/my_organizations'
    | '/dashboard/organizations/other_organizations'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/dashboard/organizations'
    | '/dashboard/personal_projects/$project_id'
    | '/auth/forgot-password/'
    | '/auth/login/'
    | '/auth/reset-password/'
    | '/auth/signup/'
    | '/dashboard/notifications/'
    | '/dashboard/overview/'
    | '/dashboard/personal_projects/'
    | '/dashboard/profile/'
    | '/dashboard/organizations/$organization_id/members'
    | '/dashboard/organizations/other_organizations/$organization_id'
    | '/dashboard/organizations/$organization_id/'
    | '/dashboard/organizations/invitations/'
    | '/dashboard/organizations/my_organizations/'
    | '/dashboard/organizations/other_organizations/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  DashboardRouteRoute: typeof DashboardRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  DashboardRouteRoute: DashboardRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/forgot-password/",
        "/auth/login/",
        "/auth/reset-password/",
        "/auth/signup/"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard/route.tsx",
      "children": [
        "/dashboard/organizations",
        "/dashboard/personal_projects/$project_id",
        "/dashboard/notifications/",
        "/dashboard/overview/",
        "/dashboard/personal_projects/",
        "/dashboard/profile/"
      ]
    },
    "/dashboard/organizations": {
      "filePath": "dashboard/organizations/route.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/organizations/$organization_id/members",
        "/dashboard/organizations/other_organizations/$organization_id",
        "/dashboard/organizations/$organization_id/",
        "/dashboard/organizations/invitations/",
        "/dashboard/organizations/my_organizations/",
        "/dashboard/organizations/other_organizations/"
      ]
    },
    "/dashboard/personal_projects/$project_id": {
      "filePath": "dashboard/personal_projects/$project_id.tsx",
      "parent": "/dashboard"
    },
    "/auth/forgot-password/": {
      "filePath": "auth/forgot-password/index.tsx",
      "parent": "/auth"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.tsx",
      "parent": "/auth"
    },
    "/auth/reset-password/": {
      "filePath": "auth/reset-password/index.tsx",
      "parent": "/auth"
    },
    "/auth/signup/": {
      "filePath": "auth/signup/index.tsx",
      "parent": "/auth"
    },
    "/dashboard/notifications/": {
      "filePath": "dashboard/notifications/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/overview/": {
      "filePath": "dashboard/overview/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/personal_projects/": {
      "filePath": "dashboard/personal_projects/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/profile/": {
      "filePath": "dashboard/profile/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/organizations/$organization_id/members": {
      "filePath": "dashboard/organizations/$organization_id/members.tsx",
      "parent": "/dashboard/organizations"
    },
    "/dashboard/organizations/other_organizations/$organization_id": {
      "filePath": "dashboard/organizations/other_organizations/$organization_id.tsx",
      "parent": "/dashboard/organizations"
    },
    "/dashboard/organizations/$organization_id/": {
      "filePath": "dashboard/organizations/$organization_id/index.tsx",
      "parent": "/dashboard/organizations"
    },
    "/dashboard/organizations/invitations/": {
      "filePath": "dashboard/organizations/invitations/index.tsx",
      "parent": "/dashboard/organizations"
    },
    "/dashboard/organizations/my_organizations/": {
      "filePath": "dashboard/organizations/my_organizations/index.tsx",
      "parent": "/dashboard/organizations"
    },
    "/dashboard/organizations/other_organizations/": {
      "filePath": "dashboard/organizations/other_organizations/index.tsx",
      "parent": "/dashboard/organizations"
    }
  }
}
ROUTE_MANIFEST_END */
