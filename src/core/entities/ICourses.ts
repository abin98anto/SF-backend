export interface Lesson {
  title: string;
  content: string;
}

export interface Section {
  title: string;
  lessons: Lesson[];
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
  curriculum: {
    sections: Section[];
  };
}
