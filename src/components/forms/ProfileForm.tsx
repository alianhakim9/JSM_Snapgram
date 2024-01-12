import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutation";
import { ProfileValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import Loader from "../shared/Loader";
import ProfileFileUploader from "../shared/ProfileFileUploader";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const ProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();

  const form = useForm<z.infer<typeof ProfileValidationSchema>>({
    resolver: zodResolver(ProfileValidationSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
      file: [],
    },
  });

  const { data: currentUser } = useGetUserById(id);
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  const mCurrentUser = currentUser as Models.Document;

  if (!mCurrentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const onSubmit = async (value: z.infer<typeof ProfileValidationSchema>) => {
    const updatedUser = await updateUser({
      userId: mCurrentUser?.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      username: value.username,
      email: value.email,
      imageUrl: mCurrentUser.imageUrl,
      imageId: mCurrentUser.imageId,
    });

    if (!updatedUser) {
      toast({
        title: "Please try again.",
      });
    }

    const mUpdatedUser = updatedUser as Models.Document;

    setUser({
      ...user,
      name: mUpdatedUser?.name,
      bio: mUpdatedUser?.bio,
      imageUrl: mUpdatedUser?.imageUrl,
    });

    return navigate(`/profile/${id}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfileFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={mCurrentUser?.imageUrl}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write your bio here..."
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? <Loader /> : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
