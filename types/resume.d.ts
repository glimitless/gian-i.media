export type ResumeBlockItem = {
  name:string;
  institution:string;
  date:string;
  location:string;
  items:string[];
}
export type ResumeBlock = {
  title:string;
  id:string;
  content:ResumeBlockItem[];
}