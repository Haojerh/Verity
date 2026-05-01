import { Link } from "react-router-dom";
import logoImage from "../../assets/Verity.svg";

export default function AuthCard({ title, subtitle, children, footerText, linkText, linkTo }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-dark-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logoImage} className="h-12 mb-4" alt="Verity Logo" />
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