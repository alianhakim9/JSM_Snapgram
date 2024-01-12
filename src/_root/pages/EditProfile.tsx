import ProfileForm from "@/components/forms/ProfileForm";

const EditProfile = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/edit.svg" alt="Edit" width={36} height={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
