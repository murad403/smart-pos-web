export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

type SignInMessages = {
  language: string;
  title: string;
  description: string;
  emailLabel: string;
  passwordLabel: string;
  rememberMe: string;
  forgotPassword: string;
  submit: string;
  validation: {
    invalidEmail: string;
    passwordMin: string;
  };
};

type WelcomeMessages = {
  title: string;
  subtitle: string;
  selectRole: string;
  admin: string;
  staff: string;
  customer: string;
  adminAria: string;
  staffAria: string;
  customerAria: string;
};

export type AppMessages = {
  signIn: SignInMessages;
  welcome: WelcomeMessages;
};

export const appMessages: Record<Locale, AppMessages> = {
  en: {
    signIn: {
      language: "Language",
      title: "Sign In",
      description: "Access the Dreamspos panel using your email and passcode.",
      emailLabel: "Email",
      passwordLabel: "Password",
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",
      submit: "Sign In",
      validation: {
        invalidEmail: "Please enter a valid email address.",
        passwordMin: "Password must be at least 6 characters.",
      },
    },
    welcome: {
      title: "SmartPOS",
      subtitle: "Restaurant Management System",
      selectRole: "Select Your Role",
      admin: "Admin",
      staff: "Staff",
      customer: "Customer",
      adminAria: "Sign in as admin",
      staffAria: "Sign in as staff",
      customerAria: "Continue as customer",
    },
  },
  id: {
    signIn: {
      language: "Bahasa",
      title: "Masuk",
      description: "Akses panel Dreamspos menggunakan email dan kode sandi Anda.",
      emailLabel: "Email",
      passwordLabel: "Kata sandi",
      rememberMe: "Ingat saya",
      forgotPassword: "Lupa kata sandi?",
      submit: "Masuk",
      validation: {
        invalidEmail: "Masukkan alamat email yang valid.",
        passwordMin: "Kata sandi minimal 6 karakter.",
      },
    },
    welcome: {
      title: "SmartPOS",
      subtitle: "Sistem Manajemen Restoran",
      selectRole: "Pilih Peran Anda",
      admin: "Admin",
      staff: "Staf",
      customer: "Pelanggan",
      adminAria: "Masuk sebagai admin",
      staffAria: "Masuk sebagai staf",
      customerAria: "Lanjut sebagai pelanggan",
    },
  },
};

export const getLocaleMessages = (locale: string | null | undefined) => {
  if (locale === "id") {
    return appMessages.id;
  }

  return appMessages.en;
};