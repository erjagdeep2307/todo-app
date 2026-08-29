import { useEffect, useMemo, useState } from "react";
import {
  CameraIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { toast } from "sonner";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import userImage from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";
import { uploadCloudinary } from "../../lib/cloudinary";
import { supabase } from "../../lib/supabase";
import {
  INPUT_BASE_CLASS,
  getCloudinaryVersionFromPath,
  getImageUrl,
} from "../../utils/utils";

export default function Settings() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || "",
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const avatarPreview = useMemo(() => {
    if (avatarFile) {
      return URL.createObjectURL(avatarFile);
    }

    const avatarUrl = user?.user_metadata?.avatar_url;
    return avatarUrl ? getImageUrl(avatarUrl, 160, 160) : userImage;
  }, [avatarFile, user?.user_metadata?.avatar_url]);

  useEffect(() => {
    if (!avatarFile) return;
    const previewUrl = avatarPreview;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [avatarFile, avatarPreview]);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      let avatarUrl = user?.user_metadata?.avatar_url || null;

      if (avatarFile) {
        const resp = await uploadCloudinary(avatarFile);
        const imageVer = getCloudinaryVersionFromPath(resp.secure_url);
        avatarUrl = `${imageVer}/${resp.public_id}`;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          avatar_url: avatarUrl,
        },
      });

      if (error) {
        throw error;
      }

      setAvatarFile(null);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to update profile.",
      );
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to update password.",
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="mx-auto flex h-full min-h-0 max-w-5xl flex-col gap-3 overflow-y-auto sm:px-4">
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <UserCircleIcon className="h-5 w-5 text-todo-primary" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Profile settings
            </h1>
            <p className="text-sm text-gray-500">
              Manage your public profile details and account password.
            </p>
          </div>
        </div>

        <form
          className="grid gap-5 pt-5 lg:grid-cols-[220px_1fr]"
          onSubmit={handleProfileUpdate}
        >
          <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4">
            <img
              src={avatarPreview}
              alt="Profile preview"
              className="h-32 w-32 rounded-full border border-gray-200 object-cover"
            />
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <CameraIcon className="h-4 w-4" />
              Change image
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <FormControl labelText="full name" id="fullName">
              <input
                id="fullName"
                type="text"
                className={INPUT_BASE_CLASS}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={80}
                required
              />
            </FormControl>
            <FormControl labelText="email" id="email">
              <input
                id="email"
                type="email"
                className={`${INPUT_BASE_CLASS} cursor-not-allowed bg-gray-100 text-gray-500`}
                value={user?.email || ""}
                disabled
                readOnly
              />
            </FormControl>
            <Button
              type="submit"
              className="mt-2 w-full rounded-md sm:w-fit"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating Profile..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
          <KeyIcon className="h-5 w-5 text-todo-primary" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Password settings
            </h2>
            <p className="text-sm text-gray-500">
              Use a strong password with at least 8 characters.
            </p>
          </div>
        </div>

        <form className="max-w-xl" onSubmit={handlePasswordUpdate}>
          <FormControl labelText="new password" id="newPassword">
            <input
              id="newPassword"
              type="password"
              className={INPUT_BASE_CLASS}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
            />
          </FormControl>
          <FormControl labelText="confirm password" id="confirmPassword">
            <input
              id="confirmPassword"
              type="password"
              className={INPUT_BASE_CLASS}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />
          </FormControl>
          <Button
            type="submit"
            className="mt-2 w-full rounded-md sm:w-fit"
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
      </section>
    </div>
  );
}
