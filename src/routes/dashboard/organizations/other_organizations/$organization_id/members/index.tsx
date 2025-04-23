import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/organizations/other_organizations/$organization_id/members/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/dashboard/organizations/other_organizations/$organization_id/members/"!
    </div>
  )
}
