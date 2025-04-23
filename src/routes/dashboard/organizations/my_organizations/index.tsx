import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AddOrganizationForm from "../../../../components/forms/AddOrganizationForm";
import Organization from "../../../../components/Organization";
import EmptyState from "../../../../components/ui/EmptyState";
import Loading from "../../../../components/ui/Loading";
import Modal from "../../../../components/ui/Modal";
import { useModalContext } from "../../../../contexts/ModalContext";
import useGetUserOrganizations from "../../../../hooks/useGetUserOrganizations";
import { AppDispatch } from "../../../../store";
import { getAdminUserOrganizations } from "../../../../utils/organizations";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/",
)({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient, store } = context as {
      queryClient: QueryClient;
      store: {
        getState: () => { auth: { user: User } };
        dispatch: AppDispatch;
      };
    };
    const user = store.getState().auth.user;
    return await queryClient.ensureQueryData({
      queryFn: () => getAdminUserOrganizations(user?.id as string),
      queryKey: ["organizations", user?.id as string],
    });
  },
  pendingComponent: () => Loading({ message: "Loading user Organizations" }),
});

function RouteComponent() {
  const { handleActiveModal, activeModal } = useModalContext();
  const { data: organizations, isPending, isError } = useGetUserOrganizations();
  if (isPending) {
    return <Loading message="Loading organizations" />;
  }
  if (isError) {
    return (
      <span className="h-full w-full items-center justify-center text-center">
        An Error occured, reload the page and try again.
      </span>
    );
  }

  if (!organizations || organizations.length < 1)
    return (
      <EmptyState
        button={true}
        handleClick={() => handleActiveModal("add organization")}
        emptyStateText="No Organizations, Organizations you belong to will appear here."
        buttonText="Add Organization"
      >
        {activeModal === "add organization" ? (
          <Modal
            handleClose={() => handleActiveModal(null)}
            title="Add Organization"
          >
            <AddOrganizationForm
              handleCloseModal={() => handleActiveModal(null)}
            />
          </Modal>
        ) : null}
      </EmptyState>
    );
  return (
    <div className="flex flex-col gap-y-4">
      <button
        onClick={() => handleActiveModal("add organization")}
        className="btn w-fit"
      >
        Add Organization
      </button>

      {activeModal === "add organization" ? (
        <Modal
          handleClose={() => handleActiveModal(null)}
          title="Add Organization"
        >
          <AddOrganizationForm
            handleCloseModal={() => handleActiveModal(null)}
          />
        </Modal>
      ) : null}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {organizations?.map((organization) => (
          <Organization organization={organization} key={organization.id} />
        ))}
      </ul>
    </div>
  );
}
