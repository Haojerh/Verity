import { Link } from "react-router-dom";
import logoImage from "../../assets/Verity.svg";
import verityImage from "../../assets/VeritySignature.svg";

export default function AuthCard({ title, subtitle, children, footerText, linkText, linkTo }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-100 to-red-100 px-4 py-12">
      <img src={logoImage} className="h-10 absolute top-3 left-4" alt="Verity Logo" />
      <div className="w-full max-w-md p-8 rounded-4xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/10 border-2 border-foreground/10 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col items-center mb-8">
          <img src={verityImage} className="h-12 mb-4" alt="Verity Logo" />
          <h1 className="text-2xl font-bold text-foreground text-center">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">{subtitle}</p>
        </div>

        {children}

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {footerText}{" "}
          <Link to={linkTo} className="text-primary font-semibold hover:underline">
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}