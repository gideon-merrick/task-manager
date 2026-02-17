"use client";

import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="navbar bg-base-100 px-4 shadow-lg">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          MyApp
        </Link>
      </div>

      <div className="flex-none">
        {isPending && <div className="skeleton h-10 w-10 rounded-full" />}
        {!isPending && session && (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar" tabIndex={0} type="button">
              <div className="w-10 rounded-full">
                {session.user.image ? (
                  <Image alt={session.user.name} height={50} src={session.user.image} width={50} />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral text-neutral-content">
                    <span className="text-lg">{session.user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
              <li className="menu-title px-4 py-2">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{session.user.name}</span>
                  <span className="font-normal text-xs opacity-60">{session.user.email}</span>
                </div>
              </li>
              <div className="divider my-0" />
              <li>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </li>
              <div className="divider my-0" />
              <li>
                <button className="text-error" onClick={handleLogout} type="button">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {!(isPending || session) && (
          <Link className="btn btn-primary" href="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
