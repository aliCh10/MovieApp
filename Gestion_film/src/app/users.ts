// user.model.ts
export interface User {
    uid: string;
    email: string;
    username: string;
    role: string;
    photoURL: string;
    isBlocked: boolean; // Par exemple, si l'utilisateur est bloqué ou non
  }
  