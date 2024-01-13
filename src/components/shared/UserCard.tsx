import { Models } from "appwrite";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  if (!user) return;

  return (
    <div className="user-card">
      <div className="flex flex-col items-center justify-center">
        <img
          src={user.imageUrl}
          alt="User"
          width={100}
          className="rounded-full"
        />
        <h2 className="h3-bold md:h2-bold text-center w-full mt-5">
          {user.name}
        </h2>
        <p className="text-primary-500">@{user.username}</p>
        <Button className="shad-button_primary mt-5">Follow</Button>
      </div>
    </div>
  );
};

export default UserCard;
