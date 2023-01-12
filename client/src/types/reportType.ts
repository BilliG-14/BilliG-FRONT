export type NewReportType = {
  details: string | undefined;
  target: string;
};

export type ReportType = {
  createdAt: string;
  details: string;
  reporter: {
    name: string;
    _id: string;
  };
  target: {
    name: string;
    _id: string;
  };
  updatedAt: string;
  _id: string;
};
