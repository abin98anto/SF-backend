export interface Lesson {
  name: string;
  videoUrl: string;
  pdfUrls: string[];
}

export interface Section {
  name: string;
  lectures: Lesson[];
}

export interface ICourse {
  _id?: string;
  basicInfo: {
    title: string;
    subtitle: string;
    category: string;
    topic: string;
    language: string;
    duration: string;
  };
  advanceInfo: {
    thumbnail: string | null;
    description: string;
  };
  curriculum: Section[];
}
