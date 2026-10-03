export interface CentreInfo {
  name: string;
  legalName: string;
  logoUrl: string;
  tagline: string;
  landmark: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  formattedAddress: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  phones: {
    primary: string;
    secondary: string;
    displayPrimary: string;
    displaySecondary: string;
  };
  whatsapp: {
    number: string;
    display: string;
    chatUrl: string;
  };
  hours: string;
  hoursDetail: {
    weekday: string;
    sunday: string;
  };
  openingHours: { days: string[]; opens: string; closes: string }[];
  googleMapsUrl: string;
  /** Profiles that confirm the business exists (GBP, Justdial, Practo, social). Empty until supplied by the client. */
  sameAs: string[];
  /** Schema.org data is emitted only for facts flagged true here. Flip after client confirmation. */
  verified: {
    hours: boolean;
    geo: boolean;
    whatsapp: boolean;
    aggregateRating: boolean;
  };
  stats: {
    specialistsCount: number;
    googleRating: number;
    googleReviewsCount: number;
    yearsOfTrust: number;
  };
}

export const CENTRE_INFO: CentreInfo = {
  name: "Maruti Diagnostic Centre",
  legalName: "Maruti Diagnostic Centre",
  logoUrl: "/maruti_diagnostic_centre_logo.png",
  tagline: "Trusted diagnostics in Ghungoor, opposite SMCH",
  landmark: "SMCH Point, opp. SMCH, behind Maruti Medical, Ghungoor",
  address: {
    streetAddress: "SMCH Point, opp. SMCH, behind Maruti Medical, Ghungoor, Masimpur, Silcoorie Grant",
    addressLocality: "Silchar",
    addressRegion: "Assam",
    postalCode: "788014",
    addressCountry: "IN",
  },
  /** Copied byte-for-byte from the Google Business Profile. Use it everywhere so NAP stays identical. */
  formattedAddress: "SMCH Point, opp. SMCH, behind Maruti Medical, Ghungoor, Masimpur, Silchar, Silcoorie Grant, Assam 788014",
  geo: {
    latitude: 24.7892,
    longitude: 92.7938,
  },
  phones: {
    primary: "9957832872",
    secondary: "6003951660",
    displayPrimary: "+91 99578 32872",
    displaySecondary: "+91 60039 51660",
  },
  whatsapp: {
    number: "9957832872",
    display: "+91 99578 32872",
    chatUrl: "https://wa.me/919957832872?text=Hello%20Maruti%20Diagnostic%20Centre,%20I%20would%20like%20to%20enquire%20about%20a%20test%20or%20doctor%20appointment.",
  },
  hours: "Mon - Sat: 08:00 AM - 08:30 PM, Sun: Closed",
  hoursDetail: {
    weekday: "Monday - Saturday: 8:00 AM - 8:30 PM",
    sunday: "Sunday: Closed",
  },
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:30",
    },
  ],
  googleMapsUrl: "https://maps.google.com/?q=Maruti+Diagnostic+Centre+Silchar",
  sameAs: [],
  verified: {
    hours: true,
    geo: false,
    whatsapp: false,
    aggregateRating: false,
  },
  stats: {
    specialistsCount: 16,
    googleRating: 5.0,
    googleReviewsCount: 48,
    yearsOfTrust: 8,
  },
};

