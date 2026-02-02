import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://overclock.adityagupta.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  title: {
    default: "Overclock Energy | Aditya Gupta Portfolio",
    template: "%s | Aditya Gupta",
  },
  description:
    "Explore the AI Marketing portfolio of Aditya Gupta. Overclock Energy is a fictional product showcasing the power of Generative AI in advertising and commercial imagery.",
  keywords: [
    "Aditya Gupta",
    "Aditya",
    "Overclock",
    "Overclock Energy",
    "AI Marketing",
    "Generative AI",
    "Portfolio",
    "Commercial Imagery",
    "AI Advertising",
    "Creative Director",
    "Art Director"
  ],
  openGraph: {
    title: "Overclock Energy | Aditya Gupta Portfolio",
    description:
      "A showcase of Generative AI in marketing by Aditya Gupta. Featuring 'Overclock Energy' - purely AI-generated commercial assets.",
    url: "https://overclock.adityagupta.com",
    siteName: "Aditya Gupta Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure you have an OG image
        width: 1200,
        height: 630,
        alt: "Overclock Energy AI Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overclock Energy | Aditya Gupta Portfolio",
    description:
      "Aditya Gupta's AI Marketing Portfolio featuring Overclock Energy.",
    // images: ["/images/og-image.jpg"], // Optional: Fallback to OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${archivo.variable} font-sans antialiased bg-black text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Aditya Gupta",
                  url: "https://overclock.adityagupta.com",
                  jobTitle: "AI Marketing Specialist",
                  sameAs: [
                    "https://www.linkedin.com/in/aditya-gupta-/",
                    // Add other social links here
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Overclock Energy",
                  url: "https://overclock.adityagupta.com",
                  description:
                    "AI Marketing portfolio of Aditya Gupta featuring Overclock Energy.",
                  publisher: {
                    "@type": "Person",
                    name: "Aditya Gupta",
                  },
                },
              ],
            }),
          }}
        />
        {children}
        <GoogleAnalytics gaId="G-8X8F7VCX7J" />
      </body>
    </html>
  );
}

