import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type EditButtonProps = {
  userId?: string;
};

const EditButton = ({ userId }: EditButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      className="flex gap-4 p-1 shad-button_dark_4"
      onClick={() => navigate(`/update-profile/${userId}`)}
    >
      <img src="/assets/icons/edit.svg" alt="Edit" width={16} height={16} />
      Edit Profile
    </Button>
  );
};

export default EditButton;
