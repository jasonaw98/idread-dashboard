import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";

export const RequireActiveOrganization = (props: PropsWithChildren) => {
  const { orgId } = auth();

  if (orgId === process.env.NEXT_ORGID_DEMO || orgId === process.env.NEXT_ORGID_INTERNAL) {
    return props.children;
  }
  return (
    <div className="h-screen text-center flex flex-col gap-5 justify-center items-center">
      <section className="m-auto flex w-full max-w-xl items-center justify-center space-y-6 p-10 bg-white rounded-3xl shadow-lg border text-center">
        <div className="space-y-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg font-semibold">
            This part of the application requires the user to be part of the
            organization in order to proceed. If you are not part of an
            organization, you can accept an invitation or request from admin.
          </p>
          <OrganizationList hidePersonal={true} />
        </div>
      </section>
    </div>
  );
};
