import Image from "next/image";

const Profile = ({ user }: { user: UserType }) => {
  return (
    <div className="h-full p-4 py-10 flex items-center flex-col gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 dark:border-gray-800/20 shadow-lg">
      <Image
        src={user?.imageUrl}
        loading="lazy"
        blurDataURL="/blur.jpg"
        alt="logo"
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-lg lg:text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-sm lg:text-md text-primary">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
