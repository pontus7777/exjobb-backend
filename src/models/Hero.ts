export interface Hero {
  id: number // The ID value of the hero played
  name: string // Dota hero command name
  localized_name: string // Hero name
  primary_attr: string // Hero primary shorthand attribute name, e.g., 'agi'
  attack_type: string // Hero attack type, either 'Melee' or 'Ranged'
  roles: string[] // Array of hero roles
}
