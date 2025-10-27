import SharedForm from "@/components/sharedComponent/form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrationForm } from "../../config/index.js";
import { useDispatch } from "react-redux";
import { rimUserRegister } from "@/storage/authSlice/index.js";
import { toast } from "sonner"; 

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthenticationRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(rimUserRegister(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration successful 🎉");
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "Email already in use ❌");
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap">
          Create Account
        </h1>
        <p className="text-lg text-gray-600">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* FORM CARD */}
      <div
        className="w-full max-w-2xl sm:max-w-3xl bg-white rounded-3xl shadow-xl 
                   p-6 sm:p-8 lg:p-10 border border-gray-100 flex flex-col min-h-0"
      >
        <SharedForm
          controls={registrationForm}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      {/* FOOTER */}
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Rim. All rights reserved.
      </div>
    </div>
  );
}

export default AuthenticationRegister;
