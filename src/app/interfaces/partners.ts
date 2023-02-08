export interface Partners {
  companyname: string;
  revenue: number;
  year: string;
  employees: number;
  industry: string;
  revenuedetails: {
    year: string;
    profit: number;
    turnover: number;
    crossmargin: string;
  }[];
}
