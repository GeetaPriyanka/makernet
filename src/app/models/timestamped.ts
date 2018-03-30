export abstract class Timestamped {
  updated_at: Object;
  created_at: Object;
  id: string;

  constructor() {
    this.id = null;
    this.updated_at = null;
    this.created_at = null;
  }
  
}
