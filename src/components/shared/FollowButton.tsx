import { Button } from "../ui/button";

const FollowButton = () => {
  return (
    <Button className="flex gap-4 p-1 shad-button_dark_4">
      <img src="/assets/icons/follow.svg" alt="Edit" width={16} height={16} />
      Follow
    </Button>
  );
};

export default FollowButton;
