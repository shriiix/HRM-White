export class CreateLocationDto {
  tenantId: string;
  name: string;
  code?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}