export interface PartnerRole {
  title: string;
  tasks: string[];
  preparation: string[];
}

export interface PartnerRoles {
  partner1: PartnerRole;
  partner2: PartnerRole;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  duration: number | null;
  difficulty_level: number;
  completed: boolean | null;
  is_favorite: boolean;
  location: string | null;
  partner_roles: PartnerRoles | null;
}