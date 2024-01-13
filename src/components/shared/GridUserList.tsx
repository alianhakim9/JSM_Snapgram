import { Models } from "appwrite";
import UserCard from "./UserCard";

type GridUserListProps = {
  users: Models.Document[];
};

const GridUserList = ({ users }: GridUserListProps) => {
  return (
    <ul className="user-grid">
      {users.map((user, index) => (
        <li key={`user-${index}`} className="relative min-w-80 h-80">
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

export default GridUserList;
