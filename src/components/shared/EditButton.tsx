import { Button } from "../ui/button";

const EditButton = () => {
  return (
    <Button className="flex gap-4 p-1 shad-button_dark_4">
      <img src="/assets/icons/edit.svg" alt="Edit" width={16} height={16} />
      Edit Profile
    </Button>
  );
};

export default EditButton;
