import GridUserList from "@/components/shared/GridUserList";
import Loader from "@/components/shared/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";

const AllUsers = () => {
  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isUserLoading || isErrorCreators) {
    return (
      <div className="flex w-full h-full">
        <Loader />
      </div>
    );
  }

  const mCreators = creators as Models.Document;

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full ">
          <img
            src="/assets/icons/people.svg"
            alt="All User"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>
      </div>
      <GridUserList users={mCreators.documents} />
    </div>
  );
};

export default AllUsers;
