export interface Review {
  title: string;
  text: string;
  status: 'approved' | 'pending' | 'disapproved';
  rating: number;
  email: string;
  name: string;
  date_reviewed: string;
  id: number;
  // product_id: number;
  date_created: string;
  date_modified: string;
}