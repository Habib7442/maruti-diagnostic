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
  googleMapsUrl: string;
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
  landmark: "SMC Point, Ghungoor, Opp. SMCH, Behind Maruti Medical",
  address: {
    streetAddress: "SMC Point, Ghungoor, Opp. SMCH, Behind Maruti Medical",
    addressLocality: "Silchar",
    addressRegion: "Assam",
    postalCode: "788014",
    addressCountry: "IN",
  },
  formattedAddress: "SMC Point, Ghungoor, Opp. SMCH, Behind Maruti Medical, Silchar, Cachar, Assam 788014",
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
  hours: "Mon - Sat: 07:30 AM - 08:30 PM, Sun: 08:00 AM - 02:00 PM",
  hoursDetail: {
    weekday: "Monday - Saturday: 7:30 AM - 8:30 PM",
    sunday: "Sunday: 8:00 AM - 2:00 PM",
  },
  googleMapsUrl: "https://maps.google.com/?q=Maruti+Diagnostic+Centre+Silchar",
  stats: {
    specialistsCount: 16,
    googleRating: 5.0,
    googleReviewsCount: 48,
    yearsOfTrust: 8,
  },
};

