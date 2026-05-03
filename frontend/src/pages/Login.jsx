import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import { request } from "../request/request";
import { Http } from "../constant/http.method";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await request(
        Http.POST,
        "/login",
        {
          username: data.email,
          password: data.password
        }
      );
      
      if (response.status === 200) {
        // Handle user metadata storage
        const { name, email, userRole } = response.data

        window.localStorage.setItem('display_name', name);
        window.localStorage.setItem('user_role', userRole)

        window.location.href = '/';
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <AuthCard 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account"
      footerText="Don't have an account?"
      linkText="Create an account"
      linkTo="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput 
          label="Email Address" 
          icon={Mail} 
          type="email" 
          placeholder="name@email.com" 
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

        <AuthInput 
          label="Password" 
          icon={Lock} 
          type="password" 
          placeholder="••••••••" 
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4">
          SIGN IN
        </button>
      </form>
    </AuthCard>
  );
}

// import { useState } from "react";
// import { Mail, Lock } from "lucide-react";
// import AuthCard from "../components/auth/AuthCard";
// import AuthInput from "../components/auth/AuthInput";
// import api from "../services/api";
// import { Http } from "../constant/http.method";
// // import { setAuthHeader } from "../request/request";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await api.post('/login', {
//       username: email, 
//       password: password
//     }, { 
//       withCredentials: true // Essential for the browser to save the 'Token' cookie
//     });
    
//     if (response.status === 200) {
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 100);
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     alert(error.response?.data?.message || "Invalid credentials.");
//   }
// };

//   const onSubmit = async (data, event) => {
//         event.preventDefault();
//         request(
//             Http.POST,
//             "/login",
//             {
//             }).then(
//                 (response) => {
//                     setAuthHeader(response.data.token, response.data.sysusrid);
//                     window.localStorage.setItem('user_id', response.data.sysusrid);
//                     if (response.data.nickName !== null) {
//                         window.localStorage.setItem('display_name', response.data.nickName);
//                     } else {
//                         window.localStorage.setItem('display_name', response.data.firstName + ", " + response.data.lastName);
//                     }
//                     navigation('/');
//                 }).catch((error) => {
//                     console.log (error);
//                     setAuthHeader(null);
//                     setError("root", error.response.data);
//                 }
//                 );
//     }

//   return (
//     <AuthCard 
//       title="Welcome Back" 
//       subtitle="Enter your credentials to access your account"
//       footerText="Don't have an account?"
//       linkText="Create an account"
//       linkTo="/register"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <AuthInput 
//           label="Email Address" 
//           icon={Mail} 
//           type="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           placeholder="name@email.com" 
//         />
//         <AuthInput 
//           label="Password" 
//           icon={Lock} 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="••••••••" 
//         />
//         <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4">
//           SIGN IN
//         </button>
//       </form>
//     </AuthCard>
//   );
// }