/**
 * Modelo de datos para representar un cliente
 */
export interface Customer {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  creditLimit: number;
}
