export interface EntertainerBookingSummary {
    entertainerId: number;
    stageName: string;
    timesBooked: number;
    mostRecentBookingEndDate: string | null;
  }
  
  export interface EntertainerCreateDto {
    entStageName: string;
    entSsn: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: string;
    entPhoneNumber: string;
    entWebPage: string;
    entEmailAddress: string;
    dateEntered?: string;
  }
  