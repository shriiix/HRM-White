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
  departmentId?: string;
  designationId?: string;
  locationId?: string;
}