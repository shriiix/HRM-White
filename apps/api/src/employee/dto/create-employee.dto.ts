export class CreateEmployeeDto {
  tenantId: string;
  userId: string;

  employeeCode: string;

  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  joiningDate: string;

  status?: string;
}