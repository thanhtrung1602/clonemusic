"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IUser } from "@/types/user";
import useGet from "@/hooks/useGet";
import Image from "next/image";
import { usePatch } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

const EditProfile = () => {
  const queryClient = useQueryClient();
  const { mutate } = usePatch();
  const [username, setUsername] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [city, setCity] = useState<string | undefined>("");
  const [country, setCountry] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");
  const { data: user } = useGet<IUser>("/auth/profile");

  useEffect(() => {
    setUsername(user?.username);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setCity(user?.city);
    setCountry(user?.country);
    setBio(user?.bio);
    setImage(user?.image);
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      username,
      firstName,
      lastName,
      city,
      country,
      bio,
      image,
    };

    mutate(
      { url: `/users/updateUser/${user?.id}`, data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            queryClient.invalidateQueries({
              queryKey: [`/users/getUserId/${user?.id}`],
            });
          }
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded w-full max-w-xl mx-4">
        <div className="p-5">
          <h1 className="text-xl mb-6">Edit your Profile</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      width={1000}
                      height={1000}
                      src={`${image}`}
                      alt={`${username}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1 border shadow-sm hover:bg-gray-50"
                  >
                    <FaCamera className="w-3 h-3" />
                    Update image
                  </button>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm mb-1">
                  Display name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the world a little bit about yourself. The shorter the better."
                  rows={3}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                />
              </div>

              {/* Links Section */}
              <div>
                <label className="block text-sm mb-1">Your links</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-gray-300"
                  >
                    Add link
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Add support link
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                type="button"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
