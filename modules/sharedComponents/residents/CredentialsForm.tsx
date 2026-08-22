"use client";

import { useState } from "react";

type CredentialsFormProps = {
  residentId: number;
  residentName: string;
  onClose: () => void;
  onSubmit: (data: {
    resident_id: number;
    email: string;
    password: string;
  }) => Promise<void>;
  loading: boolean;
};

export default function CredentialsForm({
  residentId,
  residentName,
  onClose,
  onSubmit,
  loading,
}: CredentialsFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    await onSubmit({
      resident_id: residentId,
      email: email.trim(),
      password: password.trim(),
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-semibold">Add Credentials</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <p className="text-slate-400 text-2xl mb-6">
          Adding credentials for:{" "}
          <span className="text-white font-medium">{residentName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-slate-300 text-2xl font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="
                w-full
                h-11
                px-4
                rounded-xl
                bg-[#020617]
                border
                border-white/10
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:border-sky-500
              "
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 text-2xl font-semibold mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  w-full
                  h-11
                  px-4
                  pr-12
                  rounded-xl
                  bg-[#020617]
                  border
                  border-white/10
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-sky-500
                "
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                bg-white/10
                text-white
                px-4
                py-2.5
                rounded-xl
                hover:bg-white/20
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="
                flex-1
                bg-purple-500
                text-white
                px-4
                py-2.5
                rounded-xl
                hover:bg-purple-600
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Adding..." : "Add Credentials"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
